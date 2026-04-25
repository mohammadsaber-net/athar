import { createSlice } from "@reduxjs/toolkit";
export const sliceLogger=createSlice({
    initialState:{
        admin:false,
        user:false
    },
    name:"sliceLogger",
    reducers:{
        setAdmin:(state,action)=>{
            state.admin=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
})
export const{setAdmin,setUser}=sliceLogger.actions