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
import { useForm, Controller } from "react-hook-form";
import { SigninFormData, signinResolver } from "@/validation";
import { InputPassword } from "@/components/form";

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    control,
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
            Log in to Twitter
          </Typography>
        </Box>

        <TextField
          placeholder="Email"
          sx={{ width: "100%" }}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email")}
        />

        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputPassword
              placeholder="Password"
              sx={{ width: "100%" }}
              error={!!errors.password}
              helperText={errors.password?.message}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
            />
          )}
          name="password"
          control={control}
          rules={{ required: true }}
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

export default Signin;
