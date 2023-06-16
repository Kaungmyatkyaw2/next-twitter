import React, { useState } from "react";
import { SideBar } from "./SideBar";
import { Grid } from "@mui/material";
import MobileAppBar from "./MobileAppBar";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <>
      <MobileAppBar setOpenSideBar={setOpenSideBar} />

      <Grid container>
        <Grid
          sx={{ borderRight: "1px solid #E0E0E0" }}
          item
          lg={3}
          md={3}
          sm={4}
          xs={0}
        >
          <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
        </Grid>
        <Grid
          item
          lg={5}
          md={7}
          sm={7}
          xs={12}
          sx={{
            marginTop: {sm : '0px',xs : '50px'},
            borderRight: "1px solid #E0E0E0",
            minHeight: "100vh",

          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};
