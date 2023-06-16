import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Twitter } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function MobileAppBar({setOpenSideBar} : {setOpenSideBar : React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <Box sx={{ display: { sm: "none", sx: "block" }, width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ color: "black" }}>
          <Twitter fontSize="large" color="primary" />
          <Typography
            fontWeight={"bold"}
            color="black"
            sx={{ paddingLeft: "10px", fontSize: "20px", color: "black" }}
          >
            Twitter
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: "auto" }}
            onClick={() => setOpenSideBar(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
