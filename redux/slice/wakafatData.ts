import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchWakafat=createAsyncThunk("fetchWakafat/sliceWakafat",async(_, { rejectWithValue })=>{
    try {
        const res=await fetch("/api/wakafat",{
        method:"get",
        headers:{"content-type":"application/json"}
        })
        const data=await res.json()
        if(data.success){
            return data.data
        }else{
        return rejectWithValue(data.message||"خطأ في جلب البيانات") 
        }
    } catch (error) {
       return rejectWithValue((error as Error).message) 
    }
})
export const sliceWakafat=createSlice({
    initialState:{
        loading:false,
        error:null as any,
        data:null as any
    },
    name:"sliceWakafat",
    extraReducers(builder) {
        builder.addCase(fetchWakafat.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(fetchWakafat.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchWakafat.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceWakafat.actions