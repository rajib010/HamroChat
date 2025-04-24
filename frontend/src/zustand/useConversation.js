import { create } from "zustand"
import { io } from "socket.io-client"

const useConversation = create((set, get) => {
    const socket = io("http://localhost:8000", {
        query: {
            userId: JSON.parse(localStorage.getItem("chat-user"))?._id
        }
    })

    socket.on("receiveMessage", data => {
        console.log("Received message:", message);
        set((state) => ({
            messages: [...state.messages, data]
        }))
    })

    return {
        socket,
        selectedConversation: null,
        setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
        messages: [],
        setMessages: (messages) => set({ messages }),
        onlineUsers: [],
        setOnlineUsers: (users) => set({ onlineUsers: users }),
       
    };
})

export default useConversation