import { Comments } from "../../types/Comments";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState: Comments[] = [];

export const fetchComments = createAsyncThunk(
  "fetchComments",

  async () => {
    const jsonData = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    return await jsonData.json();
  }
);

const commentsSlice = createSlice({
  name: "commentsSlice",
  initialState,
  reducers: {
    addNew: (state, action) => {
      state.unshift(action.payload);
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchComments.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
export const { addNew } = commentsSlice.actions;
