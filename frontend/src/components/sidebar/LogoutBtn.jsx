import React from 'react'
import { BiLogOut } from "react-icons/bi"
import useLogout from '../../hooks/useLogout.js'

function LogoutBtn() {
    const { loading, logout } = useLogout();
    return (
        <div className='mt-auto'>
            {!loading ? (
                <BiLogOut className="w-6 h-6 text-white" onClick={logout} />
            ) : (
                <span className='loading loading-spinner'></span>
            )}
        </div>
    )
}

export default LogoutBtn