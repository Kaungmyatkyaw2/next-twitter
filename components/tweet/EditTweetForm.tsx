import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import Image from "next/image";
import { uploadImage } from "@/firebase/helper";
import { useUpdateTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { useDispatch } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import { Tweet } from "@/types";
import { updateTweet } from "@/store/slice/tweet.slice";
import { toast } from "react-hot-toast";

export const EditTweetForm = ({
  tweet,
  setOpen,
}: {
  tweet: Tweet;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updateTweetFun, res] = useUpdateTweetMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const fileRef = useRef<HTMLInputElement>(null!);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCaption(tweet.caption || "");
    setPreviewUrl(tweet.image);
  }, [tweet]);

  useEffect(() => {
    if (res.isSuccess) {
      setOpen(false);
      dispatch(updateTweet(res.data.data));
      setPreviewUrl(null);
      setFile(null);
      setCaption("");
      toast.success("Successfully Updated");
      setIsLoading(false);
    } else if (res.isError) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  }, [res]);

  const handleFileSelect = () => {
    const acceptedFiles = fileRef.current.files;

    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const payload = {
      image: previewUrl,
      caption,
    };

    if (file !== null && previewUrl !== null) {
      await uploadImage(file, previewUrl + Date.now())
        .then((url) => {
          updateTweetFun({ data: { ...payload, image: url }, id: tweet.id });
        })
        .catch((error) => console.log(error));
    } else {
      updateTweetFun({ data: payload, id: tweet.id });
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "400px",
          padding: "20px 0px",
        }}
      >
        <Avatar sizes="large" style={{ textTransform: "uppercase" }}>
          {tweet.user?.username.trim().at(0)}
        </Avatar>
        <Box width={"100%"}>
          <TextareaAutosize
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="What is happening?!"
            style={{
              outline: "none",
              border: "none",
              resize: "none",
              paddingBottom: "5px",
              width: "100%",
            }}
          ></TextareaAutosize>
          <Box
            sx={{
              borderTop: "1px solid gray",
              paddingTop: "20px",
            }}
          >
            {previewUrl ? (
              <Box
                sx={{
                  width: "100%",
                  height: "200px",
                  background: "red",
                  objectFit: "cover",
                }}
                position={"relative"}
              >
                <IconButton
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: "10",
                  }}
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl(null);
                  }}
                >
                  <ClearIcon />
                </IconButton>
                <Image
                  objectFit="cover"
                  fill={true}
                  src={previewUrl}
                  alt="Uploaded image"
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
                paddingTop: previewUrl ? "20px" : "",
              }}
            >
              <PhotoIcon
                onClick={() => fileRef.current.click()}
                sx={{ cursor: "pointer" }}
                color="primary"
              />
              <Box gap={2} sx={{ display: "flex" }}>
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  size="small"
                  sx={{ width: 100, padding: 1 }}
                  disabled={isLoading}
                >
                  Update
                </Button>
                <Button
                  color="black"
                  onClick={() => setOpen(false)}
                  variant="contained"
                  size="small"
                  sx={{ width: 100, padding: 1 }}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
