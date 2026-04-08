import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../features/auth/authSlice'
import { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'



const Userlogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [form,setForm] = useState({email:"",password:""})

      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(userLogin(form));

        if (res.meta.requestStatus === "fulfilled") {
        navigate("/user/home");
        }
  };


  return (
    <Form onSubmit={handleSubmit}>

        <input type="text" placeholder='Email' onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input type="password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button type='submit'>Login</button>

    </Form>
  )
}

export default Userlogin