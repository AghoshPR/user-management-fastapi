import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Userlogin from '../pages/user/Userlogin'
import AdminLogin from '../pages/admin/AdminLogin'
import UserSignup from '../pages/user/UserSignup'
import UserHome from '../pages/user/UserHome'

const AppRoutes = () => {
  return (
    <BrowserRouter>

    <Routes>
        <Route path='/user/login' element={<Userlogin/>}/>
        <Route path='/user/signup' element={<UserSignup/>}/>
        <Route path='/user/home' element={<UserHome/>}/>
        <Route path='/user/login' element={<AdminLogin/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes