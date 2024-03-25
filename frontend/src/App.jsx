import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from "../src/pages/signup/Signup.jsx"
import Login from "../src/pages/login/Login.jsx"
import Home from './pages/home/Home.jsx'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App