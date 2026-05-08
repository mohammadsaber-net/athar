import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async (
    {articleId,targetType,commentId
    }: { articleId: string; targetType: string;commentId:string},
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/likes",
        {
            method:"PATCH",
            body:JSON.stringify({articleId,commentId,targetType})
        }
      );
      const data=await res.json()
      if (data.success) {
        return data;
      } else {
        return rejectWithValue(data.message || "Error toggling like");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
export const likesTogleSlice = createSlice({
  name: "likes",
  initialState: {
    togleData:null as any
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.togleData=action.payload
    })
  },
});

export const{}=likesTogleSlice.actions