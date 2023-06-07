import { Tweet } from "@/types";
import { Box, Typography, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MessageIcon from "@mui/icons-material/Message";
import ReplyIcon from "@mui/icons-material/Reply";
import Image from "next/image";
import React, { useState } from "react";
import { TweetCardHeader } from "./TweetCardHeader";

interface Prop {
  tweet: Tweet;
}

export const TweetCard = ({ tweet }: Prop) => {
  return (
    <Box
      sx={{
        padding: "20px 30px",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <TweetCardHeader tweet={tweet} />
      <Box sx={{ paddingLeft: "70px" }}>
        {tweet.caption?.length ? (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "light",
              paddingBottom: "10px",
            }}
          >
            {tweet.caption}
          </Typography>
        ) : (
          <></>
        )}
        {tweet.image?.length ? (
          <Box
            sx={{
              width: "100%",
              height: "200px",
              background: "red",
            }}
            position={"relative"}
          >
            <Image src={tweet.image} alt="image" fill />
          </Box>
        ) : (
          <></>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: tweet.image?.length ? "20px" : "5px",
          }}
        >
          <Tooltip title="React">
            {/* @ts-ignore */}
            <FavoriteBorderIcon
              style={{ color: "#888888", fontSize: "20px" }}
            />
          </Tooltip>
          <Tooltip title="Comment">
            {/* @ts-ignore */}
            <MessageIcon style={{ color: "#888888", fontSize: "20px" }} />
          </Tooltip>
          <Tooltip title="Share">
            {/* @ts-ignore */}
            <ReplyIcon style={{ color: "#888888", fontSize: "20px" }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
