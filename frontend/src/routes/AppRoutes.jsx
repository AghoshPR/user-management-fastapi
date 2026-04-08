import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Userlogin from '../pages/user/Userlogin'
import AdminLogin from '../pages/admin/AdminLogin'

const AppRoutes = () => {
  return (
    <BrowserRouter>

    <Routes>
        <Route path='/user/login' element={<Userlogin/>}/>
        <Route path='/user/login' element={<AdminLogin/>}/>
    </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes