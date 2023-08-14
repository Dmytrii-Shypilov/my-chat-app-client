import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user-slice";
import { allUsersReducer } from "./allUsers/allUsers-slice";
import { dialogsReducer } from "./dialogs/dialogs-slice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from '@reduxjs/toolkit/query';

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["token", "name"],
};

const persReducer = persistReducer(persistConfig, userReducer);

const reducer = combineReducers({
  user: persReducer,
  allUsers: allUsersReducer,
  dialogs: dialogsReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistedStore = persistStore(store)
setupListeners(store.dispatch)