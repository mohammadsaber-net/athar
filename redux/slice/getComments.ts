import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchGetComments=createAsyncThunk("fetchGetComments/sliceGetComments",async(
    {targetId,targetType}:{targetId:string,targetType:string},
    { rejectWithValue })=>{
    try {
        const res=await fetch(`/api/comments?targetId=${targetId}&targetType=${targetType}`,{
        method:"get",
        headers:{"content-type":"application/json"},
        })
        const data=await res.json()
        if(data.success){
            return data
        }else{
        return rejectWithValue(data.message||"خطأ في جلب البيانات") 
        }
    } catch (error) {
       return rejectWithValue((error as Error).message) 
    }
})
export const sliceGetComments=createSlice({
    initialState:{
        getLoading:false,
        getError:null as any,
        getData:null as any
    },
    name:"sliceGetComments",
    extraReducers(builder) {
        builder.addCase(fetchGetComments.pending,(state,action)=>{
            state.getLoading=true
        })
        .addCase(fetchGetComments.rejected,(state,action)=>{
            state.getLoading=false
            state.getError=action.payload
        })
        .addCase(fetchGetComments.fulfilled,(state,action)=>{
            state.getLoading=false
            state.getData=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceGetComments.actions