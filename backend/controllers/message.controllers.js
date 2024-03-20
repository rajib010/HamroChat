import { ApiError, ApiResponse, asyncHandler } from "../utility/index.js"
import { Conversation } from "../model/conversation.model.js"
import { Message } from "../model/message.model.js"
import mongoose, { isValidObjectId } from "mongoose"

const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id
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

    //socket io
    conversation.save()
    return res.status(200).json(new ApiResponse(200, newMessage, "message sent successfully"))

})

const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params
    const senderId = req.user?._id;
    if (!((isValidObjectId(userToChatId)) || senderId)) {
        throw new ApiError(400, "invalid user id or reciver id")
    }

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId] }
    }).populate("messages");
    const messages = conversation.messages;
    if (!conversation) {
        return res.status(200).json(new ApiResponse(200, [], "no conversation with the user"))
    }
    return res.status(200).json(new ApiResponse(200, messages, "messages fetched successfully"))

})

export { sendMessage, getMessages }