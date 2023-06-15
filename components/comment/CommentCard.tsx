import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { TweetComment } from "@/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/store/service/endpoints/comment.endpoints";
import { toast } from "react-hot-toast";
import ReactTimeago from "react-timeago";

interface Prop {
  comment: TweetComment;
  onDeleteComplete: (id: string) => any;
}

export const CommentCard = ({ comment, onDeleteComplete }: Prop) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [disableEdit, setDisableEdit] = useState(true);
  const [description, setDescription] = useState(comment.description);
  const [updateComment, updateRes] = useUpdateCommentMutation();
  const [dropComment, dropRes] = useDeleteCommentMutation();
  const [delLoading, setDelLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setDescription(comment.description);
  }, [comment]);

  useEffect(() => {
    if (updateRes.isSuccess) {
      setDisableEdit(true);
      toast.success("Successfully comment !");
    } else if (updateRes.isError) {
      setDescription(comment.description);
      toast.error("Something went wrong !");
    }
  }, [updateRes]);

  useEffect(() => {
    if (dropRes.isSuccess) {
      onDeleteComplete(comment.id);
      setAnchorEl(null);
      setDelLoading(false);
      toast.success("Successfully Deleted");
    } else if (dropRes.isError) {
      toast.error("Something went wrong");
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
      dropComment({ id: comment.id });
    }
    if (transaction === "edit") {
      setDisableEdit(false);
      setAnchorEl(null);
    }
  };

  const handleUpdateComment = () => {
    updateComment({ id: comment.id, data: { description } });

    if (description.length) {
    } else {
      toast.error("Please Fill Input");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px 30px",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar sizes="large" style={{ textTransform: "uppercase" }}>
          {comment.user?.username.trim().at(0)}
        </Avatar>
        <Box
          sx={{
            marginLeft: "20px",
            width: "100%",
            marginRight: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {" "}
            <Box
              sx={{
                paddingBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {comment.user.username}
              </Typography>

              <Typography sx={{ fontSize: "12px", color: "#888888" }}>
                <ReactTimeago date={comment.createdAt} />
              </Typography>
            </Box>
            {me?.id === comment.userId ? (
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

          <TextareaAutosize
            disabled={disableEdit}
            value={description}
            onChange={(e) => setDescription(e.target.value.trim())}
            placeholder="Comment your opinion!"
            style={{
              outline: "none",
              border: "none",
              resize: "none",
              paddingBottom: "5px",
              width: "100%",
              borderBottom: disableEdit
                ? "0px solid transparent"
                : "1px solid #E0E0E0",
            }}
          />
          {!disableEdit && (
            <Box>
              <Button
                onClick={handleUpdateComment}
                variant="contained"
                size="small"
                sx={{
                  width: 100,
                  padding: 1,
                  fontSize: "12px",
                  height: 35,
                  marginTop: "5px",
                }}
                disabled={updateRes.isLoading}
              >
                Update
              </Button>

              <Button
                onClick={() => setDisableEdit(true)}
                variant="outlined"
                color="black"
                size="small"
                sx={{
                  width: 100,
                  padding: 1,
                  fontSize: "12px",
                  height: 35,
                  marginTop: "5px",
                  marginLeft: "5px",
                }}
                disabled={updateRes.isLoading}
              >
                Cancel
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
