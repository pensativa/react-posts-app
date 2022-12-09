import { Posts } from "../../types/Posts";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState: Posts[] = [];

export const fetchPosts = createAsyncThunk(
  "fetchPosts",

  async () => {
    const jsonData = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return jsonData.data;
  }
);

const postsSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchPosts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
