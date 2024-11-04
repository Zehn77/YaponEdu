import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
