import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/store/service/endpoints/user.endpoints";
import { RootState } from "@/store/store";
import { User } from "@/types";
import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ProfileHeader = ({
  user,
  setUser,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const { me } = useSelector((state: RootState) => state.user);
  const [alreadyFollow, setAlreadyFollow] = useState(false);
  const [follow, followRes] = useFollowUserMutation();
  const [unfollow, unfollowRes] = useUnfollowUserMutation();

  useEffect(() => {
    setAlreadyFollow(!!user?.followedBy.find((i) => i.id === me?.id));
  }, [user]);

  useEffect(() => {
    if (followRes.isSuccess) {
      setUser(followRes.data.data);
    }
  }, [followRes]);

  useEffect(() => {
    if (unfollowRes.isSuccess) {
      setUser(unfollowRes.data.data);
    }
  }, [unfollowRes]);

  const handleClickFollow = () => {
    if (alreadyFollow) {
      unfollow({
        userId: me?.id,
        followUserId: user.id,
      });
    } else {
      follow({
        userId: me?.id,
        followUserId: user.id,
      });
    }
  };

  return (
    <>
      <>
        <Box
          sx={{
            padding: "20px 30px",
            borderBottom: "1px solid #E0E0E0",
            display: "flex",
          }}
        >
          <Avatar
            sx={{
              height: "80px",
              width: "80px",
              textTransform: "uppercase",
            }}
            variant="rounded"
          >
            {user.username.trim().at(0)}
          </Avatar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                paddingX: "20px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "22px",
                  textAlign: "center",
                  paddingTop: "10px",
                }}
              >
                {user.username}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  paddingTop: "5px",
                }}
              >
                <Typography sx={{ fontSize: "12px", color: "#888888" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {user.followedBy.length + " "}
                  </span>
                  Followers
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "#888888" }}>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {user.following.length + " "}
                  </span>
                  Following
                </Typography>
              </Box>
            </Box>

            {me?.id === user.id ? (
              <Button
                variant="outlined"
                color={"black"}
                size="small"
                sx={{ width: 120, padding: 1 }}
              >
                You
              </Button>
            ) : (
              <Button
                disabled={followRes.isLoading || unfollowRes.isLoading}
                onClick={handleClickFollow}
                variant="outlined"
                color={alreadyFollow ? "error" : "primary"}
                size="small"
                sx={{ width: 120, padding: 1 }}
              >
                {alreadyFollow ? "Unfollow" : "Follow"}
              </Button>
            )}
          </Box>
        </Box>
      </>
    </>
  );
};
