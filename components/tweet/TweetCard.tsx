import { Tweet } from "@/types";
import { Box, Typography, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ReplyIcon from "@mui/icons-material/Reply";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TweetCardHeader } from "./TweetCardHeader";
import {
  useReactTweetMutation,
  useUnreactTweetMutation,
} from "@/store/service/endpoints/tweet.endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateTweet } from "@/store/slice/tweet.slice";

interface Prop {
  tweet: Tweet;
}

export const TweetCard = ({ tweet }: Prop) => {
  const [reactTweet, reactRes] = useReactTweetMutation();
  const [unreactTweet, unreactRes] = useUnreactTweetMutation();
  const [isReacted, setIsReacted] = useState(false);
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (reactRes.isSuccess) {
      dispatch(
        updateTweet({
          ...tweet,
          tweetReactions: [...tweet.tweetReactions, reactRes.data.data],
        })
      );
    }
  }, [reactRes]);

  useEffect(() => {
    if (unreactRes.isSuccess) {
      dispatch(
        updateTweet({
          ...tweet,
          tweetReactions: tweet.tweetReactions.filter(
            (i) => i.userId !== me?.id
          ),
        })
      );
    }
  }, [unreactRes]);

  useEffect(() => {
    const isExist = tweet.tweetReactions.find((i) => i.userId === me?.id);

    setIsReacted(!!isExist);
  }, [tweet]);

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* @ts-ignore */}
              {isReacted ? (
                <FavoriteIcon
                  onClick={() =>
                    unreactTweet({ userId: me?.id, tweetId: tweet.id })
                  }
                  style={{
                    color: "red",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={() =>
                    reactTweet({ userId: me?.id, tweetId: tweet.id })
                  }
                  style={{
                    color: "#888888",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              )}
              <Typography sx={{ fontSize: "15px" }}>
                {reactRes.isLoading || unreactRes.isLoading
                  ? "Reacting"
                  : tweet.tweetReactions.length}
              </Typography>
            </Box>
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
