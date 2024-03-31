import { useSocketContext } from '../context/SocketContext.jsx'
import useConversation from "../zustand/useConversation.js"
import { useEffect } from 'react'
import soundNotification from "../assets/sounds/soundNotification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(soundNotification);
            sound.play();
            setMessages([...messages, newMessage])
        })

        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])

}

export default useListenMessages