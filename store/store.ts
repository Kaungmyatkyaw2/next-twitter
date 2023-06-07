import { configureStore } from "@reduxjs/toolkit";
import RootApi from "./service/RootApi";
import userSlice from "./slice/user.slice";
import tweetSlice from "./slice/tweet.slice";

const store = configureStore({
  reducer: {
    [RootApi.reducerPath]: RootApi.reducer,
    user: userSlice,
    tweet: tweetSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RootApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
