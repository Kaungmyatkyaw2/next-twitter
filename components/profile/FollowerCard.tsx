import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import { User } from "@/types";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/store/service/endpoints/user.endpoints";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { addFollowing, storeMe } from "@/store/slice/user.slice";
import { toast } from "react-hot-toast";
const FollowerCard = ({ user }: { user: User }) => {
  const me = useSelector((state: RootState) => state.user.me);
  const [follow, followRes] = useFollowUserMutation();
  const [unfollow, unfollowRes] = useUnfollowUserMutation();
  const [isAlreadyFollow, setIsAllreadyFollow] = useState(false);
  const { push } = useRouter();
  const dispatch = useDispatch();

  console.log({ user: user.id, me: me });

  useEffect(() => {
    if (followRes.isSuccess) {
      dispatch(addFollowing(user));
    } else if (followRes.isError) {
      toast.error("An error occured");
    }
  }, [followRes]);

  useEffect(() => {
    if (unfollowRes.isSuccess) {
      dispatch(
        storeMe({
          ...me,
          following: me?.following.filter((i) => i.id != user.id),
        })
      );
    } else if (unfollowRes.isError) {
      toast.error("An error occured");
    }
  }, [unfollowRes]);

  useEffect(() => {
    if (me) {
      const findUserInCurrentUser = me.following.find((u) => u.id == user.id);

      setIsAllreadyFollow(!!findUserInCurrentUser);
    }
  }, [me]);

  const handleClickFollow = () => {
    if (isAlreadyFollow) {
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
    <Stack
      direction="row"
      spacing={2}
      sx={{ paddingY: "17px", borderBottom: "1px solid #E0E0E0" }}
    >
      <Avatar>{user.username.at(0)}</Avatar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="subtitle1"
          onClick={() => {
            push(`/profile/${user.id}`);
          }}
        >
          {user.username}
        </Typography>
        {user.id == me?.id ? (
          <Button
            variant="outlined"
            color={"black"}
            size="small"
            sx={{ width: 100, padding: 1, fontSize: "13px" }}
          >
            You
          </Button>
        ) : (
          <Button
            disabled={followRes.isLoading || unfollowRes.isLoading}
            onClick={handleClickFollow}
            variant="outlined"
            color={isAlreadyFollow ? "error" : "primary"}
            size="small"
            sx={{ width: 100, padding: 1, fontSize: "13px" }}
          >
            {isAlreadyFollow ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default FollowerCard;
