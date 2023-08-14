import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./allUsers-operations";

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: {
    allUsers: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        console.log('payload',payload)
        state.isLoading = false 
        state.allUsers = payload;
      });
  },
});


export const allUsersReducer = allUsersSlice.reducer