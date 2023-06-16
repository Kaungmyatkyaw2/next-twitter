"use client";

import { CommentCard, CreateCommetForm } from "@/components/comment";
import { LayoutProvider } from "@/components/layout";
import { TweetCard } from "@/components/tweet";
import { useLazyGetTweetsByIdQuery } from "@/store/service/endpoints/tweet.endpoints";
import { Tweet, TweetComment } from "@/types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const Tweet = () => {
  const [tweet, setTweet] = useState<Tweet>({} as Tweet);
  const [isLoading, setIsLoading] = useState(true);
  const [getTweet, tweetRes] = useLazyGetTweetsByIdQuery();
  const params = useParams();
  const { id }: any = params;

  useEffect(() => {
    if (id) {
      getTweet({ id });
    }
  }, [id]);

  useEffect(() => {
    if (tweetRes.isSuccess) {
      setTweet(tweetRes.data.data);
      setIsLoading(false);
    }
  }, [tweetRes]);

  const handleCompleteComment = (comment: TweetComment) => {
    setTweet({ ...tweet, tweetComments: [comment, ...tweet.tweetComments] });
  };

  const handleCompleteDeleteComment = (id: string) => {
    setTweet({
      ...tweet,
      //@ts-ignore
      tweetComments: tweet.tweetComments.filter((i) => i.id !== id),
    });
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
          <TweetCard tweet={tweet} />
          <CreateCommetForm tweet={tweet} onComplete={handleCompleteComment} />
          {tweet.tweetComments.length ? (
            tweet.tweetComments.map((com) => (
              <CommentCard
                onDeleteComplete={handleCompleteDeleteComment}
                comment={com}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", paddingTop: "10px" }}>
              No Comment
            </Typography>
          )}
        </>
      )}
    </LayoutProvider>
  );
};

export default Tweet;
