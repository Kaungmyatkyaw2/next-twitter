"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { createTheme, ThemeProvider, PaletteColorOptions } from "@mui/material";
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

const inter = Inter({ subsets: ["latin"] });

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
    },
  });

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
