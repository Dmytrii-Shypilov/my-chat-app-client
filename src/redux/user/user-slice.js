import { createSlice } from "@reduxjs/toolkit";
import {
  logInUser,
  signUpUser,
  logOutUser,
  getCurrentUser,
} from "./user-operations";

const initialState = {
  name: null,
  token: null,
  id: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.token = payload.token;
        state.id = payload.id
        state.isLoading = false;
      })
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.token = payload.token;
        state.id = payload.id
        state.isLoading = false;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.name = null;
        state.token = null;
        state.id = null
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, {payload})=> {
        console.log(payload)
        state.name = payload.name
        state.token = payload.token
        state.id = payload.id
        state.isLoading = false
      })
  },
});

export const userReducer = userSlice.reducer;
