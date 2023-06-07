"use client";

import { LayoutProvider } from "@/components/layout";
import { CreateTweetForm, TweetCard } from "@/components/tweet";
import { useLazyGetTweetsQuery } from "@/store/service/endpoints/tweet.endpoints";
import { storeTweets } from "@/store/slice/tweet.slice";
import { RootState } from "@/store/store";
import { Tweet } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const App = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const { tweets } = useSelector((state: RootState) => state.tweet);
  const [getTweets, res] = useLazyGetTweetsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(storeTweets(res.data.data));
    }
  }, [res]);

  useEffect(() => {
    if (me) {
      getTweets({ skip: 0, take: 5 });
    }
  }, [me]);

  return (
    <LayoutProvider>
      {res.isLoading ? (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <CreateTweetForm />
          {tweets?.map((tweet) => (
            <TweetCard tweet={tweet} />
          ))}
        </>
      )}
    </LayoutProvider>
  );
};

export default App;
