import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from "../src/pages/signup/Signup.jsx"
import Login from "../src/pages/login/Login.jsx"
import Home from './pages/home/Home.jsx'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext.jsx'

const App = () => {
  const { authUser } = useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? < Home /> : <Navigate to={'/login'} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App