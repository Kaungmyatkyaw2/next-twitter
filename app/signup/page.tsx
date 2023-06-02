"use client";

import React from "react";
import {
  Grid,
  FormControl,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Twitter } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { SigninFormData, signinResolver } from "@/hookform";

const signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<SigninFormData>({ resolver: signinResolver });

  function submitData(data: SigninFormData) {
    console.log(data);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <FormControl
        onSubmit={handleSubmit((data) => submitData(data))}
        sx={{ width: "300px", display: "flex", gap: 3 }}
      >
        <Box>
          <Twitter fontSize="large" color="primary" />
          <Typography variant="h4" fontWeight={"bold"}>
            Sign up to Twitter
          </Typography>
        </Box>

        <TextField
          placeholder="Username"
          sx={{ width: "100%" }}
          //   error={!!errors.email}
          //   helperText={errors.email?.message}
          //   {...register("email")}
        />
        <TextField
          placeholder="Email"
          sx={{ width: "100%" }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          placeholder="Password"
          sx={{ width: "100%" }}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <TextField
          placeholder="Confirm Password"
          sx={{ width: "100%" }}
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button
          // disabled={!isValid && touchedFields}
          onClick={handleSubmit((data) => submitData(data))}
          type="submit"
          sx={{ width: "100%" }}
          color="black"
          variant="contained"
        >
          Submit
        </Button>
      </FormControl>
    </Grid>
  );
};

export default signin;
