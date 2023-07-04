"use client";

import "./globals.css";
import NextNProgress from "nextjs-progressbar";
import { createTheme, ThemeProvider, PaletteColorOptions } from "@mui/material";
import { Provider } from "react-redux";
import store from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { ProtectGuard } from "@/components/auth";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

declare module "@mui/material/styles" {
  interface CustomPalette {
    black: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    black: true;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { palette } = createTheme();
  const { augmentColor } = palette;

  const createColor = (mainColor: string) =>
    augmentColor({ color: { main: mainColor } });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1A8CD8",
      },
      black: createColor("#000000"),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "200px",
            padding: "10px 30px",
            "&.Mui-disabled": {
              opacity: 50,
              cursor: "not-allowed",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              height: 50,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: "white",
            color: "black",
          },
        },
      },
    },
  });

  return (
    <html lang="en">
      <Head>
        <title>Twitter 02</title>
      </Head>
      <body>
        <SessionProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <NextNProgress />
              <ProtectGuard>{children}</ProtectGuard>
            </ThemeProvider>
          </Provider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
