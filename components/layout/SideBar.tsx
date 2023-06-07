import React from "react";
import { Box, Button, Drawer, Modal, Stack, Typography } from "@mui/material";
import { Home, Twitter } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const { push } = useRouter();

  return (
    <>
      <Drawer
        sx={{
          width: "25%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "25%",
            boxSizing: "border-box",
            padding: "20px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            paddingLeft: "20px",
            paddingBottom: "20px",
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
        <Stack spacing={2}>
          <Button
            onClick={() => push("/")}
            startIcon={<Home />}
            color="black"
            size="large"
          >
            Home
          </Button>
          <Button fullWidth color="primary" variant="contained" size="large">
            Tweet
          </Button>
        </Stack>
      </Drawer>
    </>
  );
};
