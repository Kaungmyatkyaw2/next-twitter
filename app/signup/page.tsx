"use client";

import React, { useEffect } from "react";
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
import { SignupFormData, signupResolver } from "@/validation";
import { InputPassword } from "@/components/form";
import { useSignupMutation } from "@/store/service/endpoints/user.endpoints";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [signup, res] = useSignupMutation();
  const router = useRouter();
  const { push: navigate } = router;

  console.log(res);

  useEffect(() => {
    if (res.isSuccess) {
      navigate("/");
    }
  }, [res]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields },
  } = useForm<SignupFormData>({ resolver: signupResolver });

  function submitData(data: SignupFormData) {
    const { username, password, email } = data;
    signup({ username, password, email });
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
          error={!!errors.username}
          helperText={errors.username?.message}
          {...register("username")}
        />
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
        <Controller
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <InputPassword
              placeholder="Confirm Password"
              sx={{ width: "100%" }}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputRef={ref}
            />
          )}
          name="confirmPassword"
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

export default Signup;
