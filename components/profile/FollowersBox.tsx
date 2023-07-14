import { axiosFetchFollowers } from "@/axios-client/users";
import { useLazyGetFollowersQuery } from "@/store/service/endpoints/user.endpoints";
import { User } from "@/types";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import FollowerCard from "./FollowerCard";
import { Close } from "@mui/icons-material";

interface Prop {
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowersBox = ({ user, setOpen }: Prop) => {
  const boxRef = useRef<HTMLDivElement>(null!);
  const [getFollowers, res] = useLazyGetFollowersQuery();
  const [skip, setSkip] = useState(0);
  const [maxSkip, setMaxSkip] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [followers, setFollowers] = useState<User[]>([]);

  useEffect(() => {
    if (res.isSuccess) {
      const data = res.data;
      setFollowers(data.data);
      setMaxSkip(data.maxSkip);
      setIsLoading(false);
    } else if (res.isError) {
      setIsLoading(false);
      toast.error("Failed to fetch");
    }
  }, [res]);

  useEffect(() => {
    if (user) {
      getFollowers({ skip: 0, take: 2, id: user.id });
    }
  }, [user]);

  useEffect(() => {
    if (skip > 0 && skip <= maxSkip) {
      setIsLoading(true);
      handleInfiniteScrollFetch();
    }
  }, [skip]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + boxRef.current.scrollTop + 1 >
        boxRef.current.scrollHeight
      ) {
        setSkip((prev) => prev + 2);
      }
    } catch (error) {}
  };

  const handleInfiniteScrollFetch = async () => {
    try {
      const { data: response } = await axiosFetchFollowers({
        skip,
        take: 2,
        id: user.id,
      });

      if (response.isSuccess) {
        setMaxSkip(response.maxSkip || 0);
        setFollowers([...followers, ...response.data]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      ref={boxRef}
      sx={{
        width: {
          sm: "300px",
          xs: "100%",
        },
        height: {
          sm: "500px",
          xs: "100vh",
        },
        position: {
          sm: "static",
          xs: "fixed",
        },
        top: 0,
        left: 0,
        paddingY: { sm: "0px", xs: "10px" },
        background: "white",
      }}
    >
      <Box sx={{ paddingX: "10px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Typography variant="subtitle1">
            {user.username}'s Followers
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <Close />
          </IconButton>
        </Box>
        {res.isLoading ? (
          <></>
        ) : followers.length ? (
          followers.map((u) => <FollowerCard user={u} key={u.id} />)
        ) : (
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            No Followers
          </Typography>
        )}
        {isLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingY: "20px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FollowersBox;
