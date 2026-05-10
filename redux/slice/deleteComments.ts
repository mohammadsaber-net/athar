import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchDeleteComments=createAsyncThunk("fetchDeleteComments/sliceDeleteComments",async(
    {commentId,targetType}:{commentId:string,targetType:string},
    { rejectWithValue })=>{
    try {
        const res=await fetch(`/api/comments?commentId=${commentId}&targetType=${targetType}`,{
        method:"delete",
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
export const sliceDeleteComments=createSlice({
    initialState:{
        deleteLoading:false,
        deleteError:null as any,
        deleteData:null as any
    },
    name:"sliceGetComments",
    extraReducers(builder) {
        builder.addCase(fetchDeleteComments.pending,(state,action)=>{
            state.deleteLoading=true
        })
        .addCase(fetchDeleteComments.rejected,(state,action)=>{
            state.deleteLoading=false
            state.deleteError=action.payload
        })
        .addCase(fetchDeleteComments.fulfilled,(state,action)=>{
            state.deleteLoading=false
            state.deleteData=action.payload
        })
    },
    reducers:{}
})
export const{}=sliceDeleteComments.actions