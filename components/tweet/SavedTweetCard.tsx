import { useUnsaveTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { SavedTweet } from "@/types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { SavedTweetCardHeader } from "./SavedTweetCardHeader";

export const SavedTweetCard = ({
  tweet,
  setTweets,
}: {
  tweet: SavedTweet;
  setTweets: React.Dispatch<React.SetStateAction<SavedTweet[]>>;
}) => {
  return (
    <Box
      sx={{
        padding: "10px",
        borderBottom: "1px solid #E0E0E0",
        maxHeight : '150px',
        display: "flex",
      }}
    >
      {tweet.tweet.image?.length ? (
        <Box
          sx={{
            width: '200px',
            height: "150px",
          }}
          position={"relative"}
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
      ) : (
        <></>
      )}

      <Box
        sx={{
          px: 2,
        }}
        width={"100%"}
      >
        <SavedTweetCardHeader tweet={tweet.tweet} setTweets={setTweets} />

        <Box sx={{ paddingLeft: "70px" }}>
          <Typography>{tweet.tweet.caption}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
