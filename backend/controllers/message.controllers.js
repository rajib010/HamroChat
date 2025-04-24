import { ApiError, ApiResponse, asyncHandler } from "../utility/index.js"
import { Conversation } from "../model/conversation.model.js"
import { Message } from "../model/message.model.js"
import { getRecieverSocketId } from "../socket/socket.js"
import { io } from "../socket/socket.js"

const sendMessage = asyncHandler(async (req, res) => {
    try {
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
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // const success = conversation.messages.push(newMessage._id)
        // conversation.save()

        await Promise.all([conversation.save(), newMessage.save()])
        //socket io functionality

        const receiverSocketId = getRecieverSocketId(receiverId)
        if (receiverSocketId) {
            //to specific clients only
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        return res.status(200).json(newMessage)
    } catch (e) {
        console.log("Error in sendMesage controller", error.message);
        res.status(500).json({ error: "internal server error" })
    }
})

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId.toString(), userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        // console.log(conversation);

        const messages = conversation.messages
        return res.status(200).json(messages)

    } catch (error) {
        console.log("Error in message controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteMessages = asyncHandler(async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;

        const result = await Conversation.findOneAndDelete({
            participants: { $all: [senderId.toString(), userToChatId] }
        });

        if (!result) {
            return res.status(500).json({ message: "Cannot delete empty conversation" });
        }

        return res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        console.log("Error in deleting conversation", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


export { sendMessage, getMessages, deleteMessages }