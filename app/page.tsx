"use client";

import React from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  button: {
    borderRadius: "200px",
    padding: "5px 30px",
  },
});

const App = () => {
  return (
    <Button disabled size="small" variant="contained">
      page
    </Button>
  );
};

export default App;
