"use client";

import { LayoutProvider } from "@/components/layout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { TweetCard } from "@/components/tweet";
import { useLazyGetTweetsByUserQuery } from "@/store/service/endpoints/tweet.endpoints";
import { useLazyGetUserQuery } from "@/store/service/endpoints/user.endpoints";
import { Tweet, User } from "@/types";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({} as User);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [getUser, res] = useLazyGetUserQuery();
  const [getTweets, tweetRes] = useLazyGetTweetsByUserQuery();
  const params = useParams();
  const { id }: any = params;

  useEffect(() => {
    if (id) {
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
      setTweets(tweetRes.data.data);
    } else if (tweetRes.isError) {
      // @ts-ignore
      toast.error(tweetRes.error.message);
    }
  }, [tweetRes]);

  useEffect(() => {
    if (user.id) {
      getTweets({ skip: 0, take: 5, userId: user.id });
    }
  }, [user]);

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
          {
            tweets.map(i => <TweetCard tweet={i} key={i.id}/>)
          }
          {tweetRes.isLoading && (
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
