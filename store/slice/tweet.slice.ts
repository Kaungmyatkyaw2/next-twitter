import { Tweet, User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialType {
  tweets: Tweet[] | [];
}

const initialState: InitialType = {
  tweets: [],
};

const TweetSlice = createSlice({
  name: "TWEET",
  initialState,
  reducers: {
    storeTweets: (state, action) => {
      state.tweets = action.payload;
    },
    addTweets: (state, action) => {
      state.tweets = [...state.tweets, ...action.payload];
    },
    dropTweet: (state, action) => {
      state.tweets = state.tweets.filter((i) => i.id !== action.payload.id);
    },
    updateTweet: (state, action) => {
      state.tweets = state.tweets.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
});

export const { storeTweets, dropTweet, updateTweet, addTweets } =
  TweetSlice.actions;
export default TweetSlice.reducer;
