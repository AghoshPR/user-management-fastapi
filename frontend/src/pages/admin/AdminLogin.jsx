import React from 'react'
import { useDispatch } from 'react-redux'
import { adminLogin } from '../../features/auth/authSlice'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  return (
    <>
        <form onSubmit={handleSubmit}>
        <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Admin Login</button>
    </form>
    </>
  )
}

export default AdminLogin