import { User } from "../../types/Users"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

let initialState: User[] = []

export const fetchUsers = createAsyncThunk(
  "fetchUsers",

  async () => {
    const jsonData = await fetch("https://jsonplaceholder.typicode.com/users");
    return await jsonData.json();
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const userReducer = userSlice.reducer
