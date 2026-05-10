import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchSendComments=createAsyncThunk("fetchSendComments/sliceSendComments",async(
    {comment,targetType,targetId,parentCommentId,mentions }:{
        comment:string,targetType:string,mentions :any;targetId:string,parentCommentId?:string
    },
    { rejectWithValue })=>{
    try {
        const res=await fetch("/api/comments",{
        method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({comment,targetType,targetId,mentions ,parentCommentId})
        })
        const data=await res.json()
        if(data.success){
            return data
        }else{
        return rejectWithValue(data.message||"خطأ في ارسال البيانات") 
        }
    } catch (error) {
       return rejectWithValue((error as Error).message) 
    }
})
export const sliceSendComments=createSlice({
    initialState:{
        sendLoading:false,
        sendError:null as any,
        sendData:null as any
    },
    name:"sliceSendComments",
    extraReducers(builder) {
        builder.addCase(fetchSendComments.pending,(state,action)=>{
            state.sendLoading=true
        })
        .addCase(fetchSendComments.rejected,(state,action)=>{
            state.sendLoading=false
            state.sendError=action.payload
        })
        .addCase(fetchSendComments.fulfilled,(state,action)=>{
            state.sendLoading=false
            state.sendData=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceSendComments.actions