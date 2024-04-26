import { ApiError, ApiResponse, asyncHandler } from "../utility/index.js"
import { Conversation } from "../model/conversation.model.js"
import { Message } from "../model/message.model.js"
import mongoose, { isValidObjectId } from "mongoose"
import { getRecieverSocketId } from "../socket/socket.js"
import { io } from "../socket/socket.js"

const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id
    // console.log(senderId,"senderID");
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    })
    if (!conversation) {
        conversation = await Conversation.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = await Message.create({
        senderId,
        receiverId,
        message
    })
    if (!newMessage) {
        throw new ApiError(500, "Cannot create new message. Try again")
    }
    const success = conversation.messages.push(newMessage._id)
    conversation.save()
    //socket io functionality

    const receiverSocketId = getRecieverSocketId(receiverId)
    if (receiverSocketId) {
        //to specific clients only
        io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res.status(200).json(new ApiResponse(200, newMessage, "message sent successfully"))
})

const getMessages = asyncHandler(async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;
        // console.log(senderId);  
        // console.log("hello");
        // console.log("senderId",senderId.toString());


        const conversation = await Conversation.findOne({
            participants: { $all: [senderId.toString(), userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        // console.log(conversation);

        const messages = conversation.messages
            return res.status(200).json(messages)

    } catch (error) {
        console.log("Error in message controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

export { sendMessage, getMessages }