import express, { Router } from "express"
import { sendMessage, getMessages, deleteMessages } from "../controllers/message.controllers.js"
import verifyUser from "../middlewares/verifyUser.js"

const messageRouter = new Router()

messageRouter.post("/send/:id", verifyUser, sendMessage)
messageRouter.get("/:id", verifyUser, getMessages)
messageRouter.delete("/delete/:id", verifyUser,deleteMessages )


export default messageRouter