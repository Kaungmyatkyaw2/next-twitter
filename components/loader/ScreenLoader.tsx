import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const ScreenLoader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
      position="fixed"
    >
      <CircularProgress size={"50px"} color="primary" />
    </Box>
  );
};
