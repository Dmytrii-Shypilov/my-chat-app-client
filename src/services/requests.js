import axios from "axios";
import { appUrl } from "../constants/constants";

const appRequest = axios.create({
  baseURL: appUrl,
});

const logIn = async (body) => {
  try {
    const { data } = await appRequest.post("/users/logIn", body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const signUp = async (body) => {
  try {
    const { data } = await appRequest.post("/users/signUp", body);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const logOut = async (token) => {
  try {
    const { data } = await appRequest.post("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const getCurrent = async (token) => {
  try {
    const { data } = await appRequest.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchAllUsers = async (token) => {
  try {
    const { data } = await appRequest.get("/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return data.allUsers
  } catch (error) {
    console.log(error.message);
  }
};

const addDialog = async(token, userId) => {
  try {
    const userToAdd = {userId}
    const {data} = await appRequest.post(userToAdd, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchAllDialogs = async(token) => {
  try {
    const {data} = await appRequest.get('dialogs/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const requestsAPI = {
  logIn,
  signUp,
  logOut,
  getCurrent,
  fetchAllUsers,
  addDialog, 
  fetchAllDialogs
};

