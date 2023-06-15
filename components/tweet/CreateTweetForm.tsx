import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Button, Input, TextareaAutosize } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import Image from "next/image";
import { uploadImage } from "@/firebase/helper";
import { useCreateTweetMutation } from "@/store/service/endpoints/tweet.endpoints";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { storeTweets } from "@/store/slice/tweet.slice";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const CreateTweetForm = () => {
  const [createTweet, res] = useCreateTweetMutation();
  const [caption, setCaption] = useState("");
  const { me } = useSelector((state: RootState) => state.user);
  const { tweets } = useSelector((state: RootState) => state.tweet);
  const fileRef = useRef<HTMLInputElement>(null!);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(
        storeTweets([...(tweets === null ? [] : tweets), res.data.data])
      );
      setPreviewUrl(null);
      setFile(null);
      setCaption("");
      toast.success("Successfully tweeted");
    }
  }, [res]);

  const handleFileSelect = () => {
    const acceptedFiles = fileRef.current.files;

    if (acceptedFiles?.length) {
      setFile(acceptedFiles[0]);
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  const handleCreate = async () => {
    if (caption.length || file !== null) {
      const payload = {
        image: "",
        caption,
        userId: me?.id,
      };

      if (file !== null && previewUrl !== null) {
        await uploadImage(file, previewUrl + Date.now())
          .then((url) => (payload.image = url))
          .catch((error) => console.log(error));
      }

      createTweet(payload);
    } else {
      toast.error("Must have caption or image something...");
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
          padding: "20px 30px",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Avatar sizes="large" style={{ textTransform: "uppercase" }}>
          {me?.username.trim().at(0)}
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
                <Image fill={true} src={previewUrl} alt="Uploaded image" />
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
              <Button
                onClick={handleCreate}
                variant="contained"
                size="small"
                sx={{ width: 100, padding: 1 }}
                disabled={res.isLoading}
              >
                Tweet
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
