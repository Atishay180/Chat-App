import React from 'react'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { useAuthContext } from './context/AuthContext'
import UserAccountLogo from './components/userAccount/UserAccountLogo'
import UserAccount from './pages/account/UserAccount'

const App = () => {
  const { authUser } = useAuthContext();

  return (
    <div className='p-4 h-screen flex-col flex items-center justify-center'>
      <UserAccountLogo />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/account" element={!authUser ? <Navigate to="/" /> : <UserAccount />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
