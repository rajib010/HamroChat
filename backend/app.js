import cors from "cors"
import cookieParser from "cookie-parser"
import {app} from "./socket/socket.js";
import express from "express"


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
})) //to parse the incoming requests with JSON payloads(from req.body)

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())


// import the routers

import authRouter from "./routes/auth.routes.js"
import messageRouter from "./routes/message.routes.js"
import userRouter from "./routes/user.routes.js"

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)
app.use("/api/users", userRouter)


export default app;