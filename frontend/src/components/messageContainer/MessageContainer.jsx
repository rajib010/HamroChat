import React, { useEffect } from 'react'
import Messages from './Messages.jsx'
import MessageInput from './MessageInput.jsx'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation.js'

function MessageContainer() {
    const {selectedConversation, setSelectedConversation} = useConversation();

    useEffect(()=>{

        //cleanup function
        return ()=>setSelectedConversation(null)
    },[setSelectedConversationselectedConversation])
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (<NoChatSelected />) : (
                <>
                    {/* Header */}
                    <div className="bg-slate-700 px-4 py-2 mb-2">
                        <span className='label-text font-semibold'>To:</span> &nbsp;
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    )
}


const NoChatSelected = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 John Doe</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    )
}

export default MessageContainer