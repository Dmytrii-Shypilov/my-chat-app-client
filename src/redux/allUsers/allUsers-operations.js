import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestsAPI } from "../../services/requests";


export const getAllUsers = createAsyncThunk(
    'allUsers/get',
    async(token , {rejectWithValue}) => {
        try {
            console.log('Token', token)
            const allUsers = await requestsAPI.fetchAllUsers(token)
            console.log(allUsers)
            return allUsers
        } catch (error) {
            rejectWithValue(error)
        }
     
    }
)