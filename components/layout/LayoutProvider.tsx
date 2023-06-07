import React from "react";
import { SideBar } from "./SideBar";
import { Box } from "@mui/system";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideBar />
      <Box
        sx={{
          width: "40%",
          marginLeft: "25%",
          borderRight: "1px solid #E0E0E0",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </>
  );
};
