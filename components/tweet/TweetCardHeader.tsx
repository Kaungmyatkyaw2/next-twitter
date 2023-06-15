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
import { Tweet } from "@/types";
import { useDeleteTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { useDispatch } from "react-redux";
import { dropTweet } from "@/store/slice/tweet.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SimpleModal } from "../modal";
import { EditTweetForm } from "./EditTweetForm";
import { useRouter } from "next/navigation";

export const TweetCardHeader = ({ tweet }: { tweet: Tweet }) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [drop, dropRes] = useDeleteTweetMutation();
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (dropRes.isSuccess) {
      dispatch(dropTweet({ id: tweet.id }));
      setAnchorEl(null);
      setDelLoading(false);
    }
  }, [dropRes]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (transaction?: string) => {
    if (!transaction) {
      setAnchorEl(null);
      return;
    }
    if (transaction === "delete") {
      setDelLoading(true);
      drop({ id: tweet.id });
    }
    if (transaction === "edit") {
      setEditBoxOpen(true);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
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
                onClose={() => (delLoading ? "" : handleClose())}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  disabled={delLoading}
                  onClick={() => handleClose("delete")}
                >
                  {delLoading ? <CircularProgress size={"20px"} /> : "Delete"}
                </MenuItem>
                <MenuItem onClick={() => handleClose("edit")}>Edit</MenuItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>

      <SimpleModal open={editBoxOpen}>
        <EditTweetForm tweet={tweet} setOpen={setEditBoxOpen} />
      </SimpleModal>
    </>
  );
};
