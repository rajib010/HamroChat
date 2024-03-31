import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation.js';
import useGetConversations from '../../hooks/useGetConversations.js';
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      toast.error("Search must be atleast 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(
      search.toLowerCase()));

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!!");
    }
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
      <input type="text" placeholder="Search.." className="input input-bordered w-full max-w-xs"
        value={search} onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <FaSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput