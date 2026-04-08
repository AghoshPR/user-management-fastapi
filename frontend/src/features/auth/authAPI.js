import axios from "axios";

const API = axios.create({
    baseURL : "http://127.0.0.1:8000",
})
export const userLoginAPI = (data)=>API.post("/user/login",data)
export const adminLoginAPI = (data)=>API.post("/admin/login",data)