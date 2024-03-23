import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import LogoutBtn from './LogoutBtn.jsx'

function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput />
        <div className='divider px-3'></div>
         <Conversations />
        <LogoutBtn />
    </div>
  )
}

export default Sidebar