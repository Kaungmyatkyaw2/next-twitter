import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactTimeago from "react-timeago";
import { SavedTweet, Tweet } from "@/types";
import { useUnsaveTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";

export const SavedTweetCardHeader = ({
  tweet,
  setTweets,
}: {
  tweet: Tweet;
  setTweets: React.Dispatch<React.SetStateAction<SavedTweet[]>>;
}) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [unsaveTweet, unsaveRes] = useUnsaveTweetMutation();
  const [unsaveLoading, setUnsaveLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (unsaveRes.isSuccess) {
      setTweets((prev) => prev.filter((i) => i.tweetId !== tweet.id));
      setAnchorEl(null);
      setUnsaveLoading(false);
    }
  }, [unsaveRes]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (transaction?: string) => {
    if (!transaction) {
      setAnchorEl(null);
      return;
    }
    if (transaction === "unsave") {
      setUnsaveLoading(true);
      unsaveTweet({ userId: me?.id, tweetId: tweet.id });
    }
    if (transaction === "view") {
      push(`/tweet/${tweet.id}/`);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "5px",
        }}
      >
        <Avatar
          onClick={() => push(`/profile/${tweet.userId}`)}
          sx={{ height: "50px", width: "50px", textTransform: "uppercase" }}
          sizes="large"
        >
          {tweet.user.username.trim().at(0)}
        </Avatar>
        <Box
          sx={{
            paddingLeft: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => push(`/profile/${tweet.userId}`)}
            >
              {tweet.user.username}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#888888" }}>
              <ReactTimeago date={tweet.createdAt} />
            </Typography>
          </Box>
          {me?.id === tweet.user.id ? (
            <>
              <IconButton
                size="small"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => (unsaveLoading ? "" : handleClose())}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  disabled={unsaveLoading}
                  onClick={() => handleClose("unsave")}
                >
                  {unsaveLoading ? (
                    <CircularProgress size={"20px"} />
                  ) : (
                    "Unsave"
                  )}
                </MenuItem>
                <MenuItem onClick={() => handleClose("view")}>
                  View Tweet
                </MenuItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
};
