import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./features/leadsSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
