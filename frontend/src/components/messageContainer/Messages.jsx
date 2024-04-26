import React, { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from "../../hooks/useGetMessages.js"
import useListenMessages from '../../hooks/useListenMessages.js'
import MessageSkeleton from '../sekeletons/MessageSkeleton.jsx'

function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 50)
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        messages &&
        messages.map((message, index) => (
          <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && !messages && (
        <p className="text-center">Send a message to start the conversation.</p>
      )}
    </div>
  )
}

export default Messages
