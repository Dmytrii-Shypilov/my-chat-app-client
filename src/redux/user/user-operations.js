import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestsAPI } from "../../services/requests";

export const signUpUser = createAsyncThunk(
  "users/signup",
  async (data, { rejectWithValue }) => {
    try {
      const user = await requestsAPI.signUp(data);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk(
  "users/login",
  async (data, { rejectWithValue }) => {
    try {
      const user = await requestsAPI.logIn(data);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "users/logout",
  async (data, { rejectWithValue }) => {
    try {
      const result = await requestsAPI.logOut(data);
      return result;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/current",
  async (data, { rejectWithValue }) => {
    try {
      const user = await requestsAPI.getCurrent(data);
      return user;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
