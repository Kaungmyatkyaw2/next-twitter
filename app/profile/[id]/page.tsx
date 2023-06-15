"use client";

import { axiosFetchTweetsByUser } from "@/axios-client";
import { LayoutProvider } from "@/components/layout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { TweetCard } from "@/components/tweet";
import { useLazyGetTweetsByUserQuery } from "@/store/service/endpoints/tweet.endpoints";
import { useLazyGetUserQuery } from "@/store/service/endpoints/user.endpoints";
import { addTweets, storeTweets } from "@/store/slice/tweet.slice";
import { RootState } from "@/store/store";
import { Tweet, User } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Profile = () => {
  const { tweets } = useSelector((state: RootState) => state.tweet);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [maxSkip, setMaxSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tweetFetchLoading, setTweetFetchLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const [getUser, res] = useLazyGetUserQuery();
  const [getTweets, tweetRes] = useLazyGetTweetsByUserQuery();
  const params = useParams();
  const { id }: any = params;

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(storeTweets([]));
      getUser({ id });
    }
  }, [id]);

  useEffect(() => {
    if (res.isSuccess) {
      setUser(res.data.data);
      setIsLoading(false);
    } else if (res.isError) {
      // @ts-ignore
      toast.error(res.error.message);
      setIsLoading(false);
    }
  }, [res]);

  useEffect(() => {
    if (tweetRes.isSuccess) {
      dispatch(storeTweets(tweetRes.data.data));
      setMaxSkip(tweetRes.data.maxSkip || 0);
      setTweetFetchLoading(false);
    } else if (tweetRes.isError) {
      setTweetFetchLoading(false);
      // @ts-ignore
      toast.error(tweetRes.error.message);
    }
  }, [tweetRes]);

  useEffect(() => {
    if (user.id && skip === 0) {
      getTweets({ skip: 0, take: 2, userId: user.id });
    }
  }, [user]);

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
      const { data } = await axiosFetchTweetsByUser({
        skip,
        take: 2,
        userId: user.id,
      });

      if (data.isSuccess) {
        setMaxSkip(data.maxSkip || 0);
        dispatch(addTweets(data.data));
      }

      setTweetFetchLoading(false);
    } catch (error) {
      setTweetFetchLoading(false);
      console.log(error);
    }
  };

  return (
    <LayoutProvider>
      {isLoading ? (
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
          <ProfileHeader setUser={setUser} user={user} />
          {tweets.map((i) => (
            <TweetCard tweet={i} key={i.id} />
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
      )}
    </LayoutProvider>
  );
};

export default Profile;
