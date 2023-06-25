import { useUnsaveTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { SavedTweet } from "@/types";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import ReactTimeago from "react-timeago";

export const SavedTweetCard = ({
  tweet,
  setTweets,
}: {
  tweet: SavedTweet;
  setTweets: React.Dispatch<React.SetStateAction<SavedTweet[]>>;
}) => {
  const [unsaveTweet, unsaveRes] = useUnsaveTweetMutation();

  useEffect(() => {
    if (unsaveRes.isSuccess) {
      setTweets((prev) => prev.filter((i) => i.tweetId !== tweet.tweetId));
    }
  }, [unsaveRes]);

  return (
    <Box
      sx={{
        padding: "10px",
        borderBottom: "1px solid #E0E0E0",
        height: {
          sm: "150px",
          xs: "100px",
        },
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: {
            sm: "200px",
            xs: "100px",
          },

          height: {
            sm: "150px",
            xs: "100px",
          },
        }}
        position={'relative'}
      >
        <Image
          src={tweet.tweet.image || ""}
          fill={true}
          objectFit="cover"
          style={{
            borderRadius: "10px",
          }}
          alt="name"
        />
      </Box>

      <Box
        sx={{
          px: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        width={"100%"}
      >
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "12px", color: "#888888" }}>
              <ReactTimeago date={tweet.createdAt} />
            </Typography>

            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              <span>Posted by {tweet.tweet.user.username}</span>
            </Typography>
          </Box>
          <Typography sx={{ pt: "7px" }}>{tweet.tweet.caption}</Typography>
        </Box>
        <Button
          onClick={() => {
            unsaveTweet({ userId: tweet?.userId, tweetId: tweet.tweetId });
          }}
          variant="outlined"
          color="error"
          size="small"
          sx={{ width: "100%", padding: 1, mb: 1 }}
          disabled={unsaveRes.isLoading}
        >
          Unsave Tweet
        </Button>
      </Box>
    </Box>
  );
};
