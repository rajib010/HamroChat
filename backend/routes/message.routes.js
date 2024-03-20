import express, { Router } from "express"
import { sendMessage } from "../controllers/message.controllers.js"
import verifyUser from "../middlewares/verifyUser.js"

const messageRouter = new Router()

messageRouter.post("/send/:id", verifyUser, sendMessage)


export default messageRouter