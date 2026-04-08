import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const UserHome = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () =>{
        dispatch(logout())
        localStorage.removeItem("token")
        navigate("/user/login")
    }

  return (
    <>
        <h1>Hello user</h1>
        <button onClick={handleLogout}>Logout</button>

    </>
  )
}

export default UserHome