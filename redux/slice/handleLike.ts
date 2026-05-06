import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLikes = createAsyncThunk(
  "likes/fetchLikes",
  async (
    {targetId,targetType,}: {targetId: string;targetType: string;},
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `/api/likes?targetId=${targetId}&targetType=${targetType}`
      );
      const data=await res.json()
      if (data.success) {
        return {
          targetId,
          targetType,
          data: data,
        };
      } else {
        return rejectWithValue(data.message || "Error fetching likes");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async (
    {targetId,targetType,
    }: { targetId: string; targetType: string;},
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch("/api/likes",
        {
            method:"PATCH",
            body:JSON.stringify({targetId,targetType})
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
export const likesSlice = createSlice({
  name: "likes",
  initialState: {
    loading: false,
    error: null as any,
    data:null as any,
    },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.data=action.payload
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        state.data=action.payload
    })
  },
});

export default likesSlice.reducer;