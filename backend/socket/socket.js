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

const userSocketMap = {};  // { userId: socketId }

export const getRecieverSocketId = async (receiverId) => {
    return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
    console.log("a user connected ", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // send message to specific user only
    socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const receiverSocketId = await getRecieverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", {
                senderId,
                message,
                timestamp: new Date().toISOString(),
            });
        }
    });

    socket.on("disconnect", () => { 
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
