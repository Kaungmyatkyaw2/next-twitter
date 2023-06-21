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
  useSaveTweetMutation,
  useUnreactTweetMutation,
  useUnsaveTweetMutation,
} from "@/store/service/endpoints/tweet.endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { updateTweet } from "@/store/slice/tweet.slice";
import { useRouter } from "next/navigation";

interface Prop {
  tweet: Tweet;
}

export const TweetCard = ({ tweet }: Prop) => {
  const [reactTweet, reactRes] = useReactTweetMutation();
  const [saveTweet, saveRes] = useSaveTweetMutation();
  const [unreactTweet, unreactRes] = useUnreactTweetMutation();
  const [unsaveTweet, unsaveRes] = useUnsaveTweetMutation();
  const { me } = useSelector((state: RootState) => state.user);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const isReacted = tweet.tweetReactions.find((i) => i.userId === me?.id);
  const isSaved = tweet.savedTweet.find((i) => i.userId === me?.id);

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
    if (saveRes.isSuccess) {
      dispatch(
        updateTweet({
          ...tweet,
          savedTweet: [...tweet.savedTweet, saveRes.data.data],
        })
      );
    }
  }, [saveRes]);

  useEffect(() => {
    if (unsaveRes.isSuccess) {
      dispatch(
        updateTweet({
          ...tweet,
          savedTweet: tweet.savedTweet.filter(
            (i) => i.userId !== me?.id
          ),
        })
      );
    }
  }, [unsaveRes]);

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
              objectFit: "cover",
            }}
            position={"relative"}
          >
            <Image
              objectFit="cover"
              src={tweet.image}
              alt="image"
              className="rounded-sm"
              fill
            />
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
            <Box
              onClick={() => {
                push(`/tweet/${tweet.id}`);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
            >
              <MessageIcon style={{ color: "#888888", fontSize: "20px" }} />
              <Typography sx={{ fontSize: "15px" }}>
                {tweet.tweetComments.length}
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip
            title="Save"
            onClick={() =>
              isSaved
                ? unsaveTweet({ userId: me?.id, tweetId: tweet.id })
                : saveTweet({ userId: me?.id, tweetId: tweet.id })
            }
            sx={{ cursor: "pointer" }}
          >
            {/* @ts-ignore */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
            >
              <ReplyIcon style={{ color: "#888888", fontSize: "20px" }} />
              <Typography sx={{ fontSize: "15px" }}>
                {saveRes.isLoading || unsaveRes.isLoading ? "Processing" : isSaved ? "Unsave" : "Save"}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};
