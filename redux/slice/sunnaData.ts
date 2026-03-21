import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchSunna=createAsyncThunk("fetchSunna/sliceSunna",async(_, { rejectWithValue })=>{
    try {
        const res=await fetch("/api/sunna",{
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
export const sliceSunna=createSlice({
    initialState:{
        loading:false,
        error:null as any,
        data:null as any
    },
    name:"sliceSunna",
    extraReducers(builder) {
        builder.addCase(fetchSunna.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(fetchSunna.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchSunna.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceSunna.actions