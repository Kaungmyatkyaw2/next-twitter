import React from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { Close, Home, Twitter, Person } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { storeMe } from "@/store/slice/user.slice";
import { RootState } from "@/store/store";

const DrawerContent = ({
  setOpenSideBar,
}: {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const me = useSelector((state: RootState) => state.user.me);

  const handleSignout = async () => {
    await signOut({ redirect: false, callbackUrl: "/signin" });
    await dispatch(storeMe(null));
    push("/signin");
  };

  return (
    <>
      <Box
        sx={{
          paddingLeft: "20px",
          paddingBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Twitter fontSize="large" color="primary" />
          <Typography
            fontWeight={"bold"}
            sx={{ paddingLeft: "10px", fontSize: "20px" }}
          >
            Twitter
          </Typography>
        </Box>
        <IconButton
          sx={{ display: { sm: "none", xs: "block" }, ml: "auto" }}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setOpenSideBar(false)}
        >
          <Close />
        </IconButton>
      </Box>
      <Box
        sx={{
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
          // background: "red",
        }}
      >
        <Stack spacing={2}>
          <Button
            onClick={() => {
              push("/");
              setOpenSideBar(false);
            }}
            startIcon={<Home />}
            color="black"
            size="large"
          >
            Home
          </Button>
          <Button
            onClick={() => {
              push("/saved");
              setOpenSideBar(false);
            }}
            startIcon={<SaveIcon />}
            color="black"
            size="large"
          >
            Saved
          </Button>
          <Button
            onClick={() => {
              push(`/profile/${me?.id}`);
              setOpenSideBar(false);
            }}
            startIcon={<Person />}
            color="black"
            size="large"
          >
            My Profile
          </Button>
        </Stack>
        <Button
          onClick={handleSignout}
          fullWidth
          color="error"
          variant="contained"
          size="large"
        >
          Sign out
        </Button>
      </Box>
    </>
  );
};

export const SideBar = ({
  openSideBar,
  setOpenSideBar,
}: {
  openSideBar: boolean;
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Drawer
        sx={{
          width: "100%",
          display: { sm: "block", xs: "none" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "25%",
            boxSizing: "border-box",
            padding: "20px",
            border: "none ",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <DrawerContent setOpenSideBar={setOpenSideBar} />
      </Drawer>
      <Drawer
        open={openSideBar}
        sx={{
          width: "100%",
          display: { sm: "none", xs: "block" },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "100%",
            boxSizing: "border-box",
            padding: "20px",
            border: "none ",
          },
        }}
        variant="temporary"
        anchor="left"
      >
        <DrawerContent setOpenSideBar={setOpenSideBar} />
      </Drawer>
    </>
  );
};
