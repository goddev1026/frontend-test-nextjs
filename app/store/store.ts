import { configureStore } from "@reduxjs/toolkit";
import leadsReducer from "./features/leadsSlice";

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
