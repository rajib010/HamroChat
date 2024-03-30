import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
});


export const getRecieverSocketId = async (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {};  //{userId:socketId}


io.on("connection", (socket) => {
    console.log("a user connected ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    //socket.on() is used to listen events. can be used on both client and server side
    socket.on("disconnnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

export { app, io, server };