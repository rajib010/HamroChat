import React, { useEffect, useState } from 'react';
import useConversation from "../zustand/useConversation.js"
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`api/message/${selectedConversation?._id}`);
                console.log(res)
                const data = await res.json();
                if (data.error) throw new error;
                setMessages(data.messages)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) {
            console.log("Hello world");
            getMessages();
        }

    }, [selectedConversation?._id, setMessages])


    return { messages, loading }
}

export default useGetMessages