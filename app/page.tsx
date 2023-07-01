"use client";

import { axiosFetchTweets } from "@/axios-client";
import { LayoutProvider } from "@/components/layout";
import { CreateTweetForm, TweetCard } from "@/components/tweet";
import { useLazyGetTweetsQuery } from "@/store/service/endpoints/tweet.endpoints";
import { addTweets, storeTweets } from "@/store/slice/tweet.slice";
import { RootState } from "@/store/store";
import { Box, CircularProgress } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const App = () => {
  const [skip, setSkip] = useState(0);
  const [maxSkip, setMaxSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { me } = useSelector((state: RootState) => state.user);
  const { tweets } = useSelector((state: RootState) => state.tweet);
  const [getTweets, res] = useLazyGetTweetsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (res.isSuccess) {
      const data = res.data;
      dispatch(storeTweets(data.data));
      setMaxSkip(data.maxSkip);
      setIsLoading(false);
    } else if (res.isError) {
      setIsLoading(false);
      toast.error("Failed to fetch");
    }
  }, [res]);

  useEffect(() => {
    dispatch(storeTweets([]));
    if (me) {
      getTweets({ skip: 0, take: 2 });
    }
  }, [me]);

  useEffect(() => {
    if (skip > 0 && skip <= maxSkip) {
      setIsLoading(true);
      handleInfiniteScrollFetch();
    }
  }, [skip]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >
        document.documentElement.scrollHeight
      ) {
        setSkip((prev) => prev + 2);
      }
    } catch (error) {}
  };

  const handleInfiniteScrollFetch = async () => {
    try {
      const { data: response } = await axiosFetchTweets({ skip, take: 2 });

      if (response.isSuccess) {
        setMaxSkip(response.maxSkip || 0);
        dispatch(addTweets(response.data));
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <LayoutProvider>
      <Head>
        <title>Home</title>
      </Head>
      <CreateTweetForm />

      {tweets?.map((tweet) => (
        <TweetCard tweet={tweet} />
      ))}

      {isLoading && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "20px",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </LayoutProvider>
  );
};

export default App;
