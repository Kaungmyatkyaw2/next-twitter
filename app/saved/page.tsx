"use client";

import { axiosFetchSavedTweets, axiosFetchTweetsByUser } from "@/axios-client";
import { LayoutProvider } from "@/components/layout";
import { SavedTweetCard, TweetCard } from "@/components/tweet";
import { useLazyGetSavedTweetsQuery } from "@/store/service/endpoints/tweet.endpoints";
import { addTweets, storeTweets } from "@/store/slice/tweet.slice";
import { RootState } from "@/store/store";
import { SavedTweet, Tweet, User } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const SavedTweet = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const [savedTweets, setSavedTweets] = useState<SavedTweet[]>([]);
  const [skip, setSkip] = useState(0);
  const [maxSkip, setMaxSkip] = useState(0);
  const [tweetFetchLoading, setTweetFetchLoading] = useState(true);
  const [getTweets, tweetRes] = useLazyGetSavedTweetsQuery();
  const params = useParams();
  const { id }: any = params;

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (tweetRes.isSuccess) {
      setSavedTweets(tweetRes.data.data);
      setMaxSkip(tweetRes.data.maxSkip || 0);
      setTweetFetchLoading(false);
    } else if (tweetRes.isError) {
      setTweetFetchLoading(false);
      // @ts-ignore
      toast.error(tweetRes.error.message);
    }
  }, [tweetRes]);

  useEffect(() => {
    if (me?.id && skip === 0) {
      getTweets({ skip: 0, take: 2, userId: me.id });
    }
  }, [me]);

  useEffect(() => {
    if (skip > 0 && skip <= maxSkip) {
      setTweetFetchLoading(true);
      handleInfiniteScrollFetch();
    }
  }, [skip]);

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
      const { data } = await axiosFetchSavedTweets({
        skip,
        take: 2,
        userId: me?.id || "",
      });

      if (data.isSuccess) {
        setMaxSkip(data.maxSkip || 0);
        setSavedTweets([...savedTweets, ...data.data]);
        // dispatch(addTweets(data.data));
      }

      setTweetFetchLoading(false);
    } catch (error) {
      setTweetFetchLoading(false);
      console.log(error);
    }
  };

  return (
    <LayoutProvider>
      <>
        {savedTweets.map((i) => (
          <SavedTweetCard
            setTweets={setSavedTweets}
            tweet={i}
            key={i.tweetId}
          />
        ))}
        {tweetFetchLoading && (
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
      </>
    </LayoutProvider>
  );
};

export default SavedTweet;