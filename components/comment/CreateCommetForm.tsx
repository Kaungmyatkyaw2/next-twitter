import { useCreateCommentMutation } from "@/store/service/endpoints/comment.endpoints";
import { RootState } from "@/store/store";
import { Tweet, TweetComment } from "@/types";
import { Avatar, Box, Button, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

interface Prop {
  tweet: Tweet;
  onComplete: (comment: TweetComment) => any;
}

export const CreateCommetForm = ({ tweet, onComplete }: Prop) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [createComment, comRes] = useCreateCommentMutation();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (comRes.isSuccess) {
      onComplete(comRes.data.data);
      setDescription("");
      toast.success("Successfully comment !");
    } else if (comRes.isError) {
      toast.error("Something went wrong !");
    }
  }, [comRes]);

  const handleComment = () => {
    if (description.trim().length) {
      createComment({
        tweetId: tweet.id,
        userId: me?.id,
        description: description,
      });
    } else {
      toast.error("Please fill input !");
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
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar sizes="large" style={{ textTransform: "uppercase" }}>
          {me?.username.trim().at(0)}
        </Avatar>
        <TextareaAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Comment your opinion!"
          style={{
            outline: "none",
            border: "none",
            resize: "none",
            paddingBottom: "5px",
            width: "100%",
            marginLeft: "20px",
            marginRight: "20px",
            borderBottom: "1px solid #E0E0E0",
          }}
        />
        <Button
          onClick={handleComment}
          variant="contained"
          size="small"
          sx={{ width: 100, padding: 1, fontSize: "12px", height: 35 }}
          disabled={comRes.isLoading}
        >
          Tweet
        </Button>
      </Box>
    </Box>
  );
};
