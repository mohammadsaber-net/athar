import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchNames=createAsyncThunk("fetchNames/sliceNames",async(_, { rejectWithValue })=>{
    try {
        const res=await fetch("/api/names",{
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
export const sliceNames=createSlice({
    initialState:{
        loading:false,
        error:null as any,
        data:null as any
    },
    name:"sliceNames",
    extraReducers(builder) {
        builder.addCase(fetchNames.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(fetchNames.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchNames.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceNames.actions