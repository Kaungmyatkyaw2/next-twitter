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
import { Close, Home, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { storeMe } from "@/store/slice/user.slice";

const DrawerContent = ({
  setOpenSideBar,
}: {
  setOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleSignout = async () => {
    await signOut({ redirect: false, callbackUrl: "/signin" });
    dispatch(storeMe(null));
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
          onClick={handleSignout}
          fullWidth
          color="error"
          variant="contained"
          size="large"
        >
          Sign out
        </Button>
      </Stack>
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
