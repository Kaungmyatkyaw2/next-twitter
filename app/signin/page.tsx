"use client";

import React, { useState } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { env } from "process";
import { useRouter } from "next/navigation";
import Head from "next/head";

const Signin = () => {
  const data = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    control,
  } = useForm<SigninFormData>({ resolver: signinResolver });
  const { push } = useRouter();

  async function submitData(data: SigninFormData) {
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
      }

      setIsLoading(false);
    } catch (eror) {
      setIsLoading(false);
    }
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
      <Head>
        <title>Signin</title>
      </Head>
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
          disabled={isLoading}
          onClick={handleSubmit((data) => submitData(data))}
          type="submit"
          sx={{ width: "100%" }}
          color="black"
          variant="contained"
        >
          Submit
        </Button>
        <Typography
          color={"primary"}
          sx={{ fontSize: "14px", textAlign: "center", cursor: "pointer" }}
          onClick={() => push("/signup")}
        >
          Sign up
        </Typography>
      </FormControl>
    </Grid>
  );
};

export default Signin;
