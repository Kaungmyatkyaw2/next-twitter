import { configureStore } from "@reduxjs/toolkit";
import RootApi from "./service/RootApi";

const store = configureStore({
  reducer: {
    [RootApi.reducerPath]: RootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RootApi.middleware),
});

export type RootState = typeof store;
export default store;
