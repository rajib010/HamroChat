import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import { TiMessages } from 'react-icons/ti'
import { AiTwotoneDelete } from "react-icons/ai";
import useConversation from '../../zustand/useConversation.js'
import { useAuthContext } from '../../context/AuthContext.jsx'
import useDeleteConversation from '../../hooks/useDeleteConversation.js'

function MessageContainer() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { deleteConversation } = useDeleteConversation();

    const handleDeleteConversation = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this conversation?");
        if (confirmed) {
            try {
                await deleteConversation(selectedConversation._id);
                setSelectedConversation(null);
            } catch (error) {
                console.error("Error deleting conversation:", error);
            }
        }
    };

    useEffect(() => {
        // Cleanup function
        return () => setSelectedConversation(null)
    }, [setSelectedConversation])

    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className="bg-slate-700 px-4 py-2 mb-2 flex flex-row items-center">
                        <span className='label-text font-semibold'>To:</span>
                        <span className='text-gray-900 font-bold ml-2'>{selectedConversation.fullName}</span>
                        <span className='ml-auto'>
                            <AiTwotoneDelete className='text-3xl hover:' onClick={handleDeleteConversation} />
                        </span>
                    </div>

                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}

const NoChatSelected = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser.data.fullName}</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}

export default MessageContainer
