import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginAPI, adminLoginAPI } from "./authAPI";

export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (data,thunkAPI) =>{
        try{
            const res = await userLogin(data)
            return res.data
        }
        catch(err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const adminLogin = createAsyncThunk(
    "auth/adminLogin",
    async (data,thunkAPI) => {
        try{
            const res = await adminLoginAPI(data)
            return res.data

        }catch (err){
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:{
        token:null,
        role:null,
        isAuthenticated:false
    },
    reducers: {
        logout: (state) => {
            state.token = null
            state.role = null
            state.isAuthenticated = false
        },
    },
     extraReducers: (builder) => {
        builder
        .addCase(userLogin.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
            state.role = "user";
            state.isAuthenticated = true;
        })
        .addCase(adminLogin.fulfilled, (state, action) => {
            state.token = action.payload.access_token;
            state.role = "admin";
            state.isAuthenticated = true;
        });
    },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;

