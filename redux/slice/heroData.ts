import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchHero=createAsyncThunk("fetchHero/sliceHero",async(_, { rejectWithValue })=>{
    try {
        const res=await fetch("/api/hero",{
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
export const sliceHero=createSlice({
    initialState:{
        loading:false,
        error:null as any,
        data:null as any
    },
    name:"sliceHero",
    extraReducers(builder) {
        builder.addCase(fetchHero.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(fetchHero.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        .addCase(fetchHero.fulfilled,(state,action)=>{
            state.loading=false
            state.data=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceHero.actions