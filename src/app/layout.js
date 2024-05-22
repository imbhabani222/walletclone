"use client";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import { Providers } from "../redux/provider/index";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import Masterlayout from "../component/masterlayout/masterlayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Auth from "../config/auth";
import Toaster from "../component/toaster/toaster";
import ErrorBoundary from "../component/errorboundary/errorboundary";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--poppins",
});
const clientSideEmotionCache = createEmotionCache();

export default function RootLayout({
  children,
  emotionCache = clientSideEmotionCache,
}) {
  const loginid = Auth.getRole() ? true : false;
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: "var(--poppins)",
      },
    },
  });

  return (
    <html lang="en">
      <head>
        <title>Prospay</title>
        <meta name="description" content="Prospay" />

        {/* <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';"
        ></meta> */}
      </head>
      <body className={poppins.className}>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <CacheProvider value={emotionCache}>
              <Providers>
                <Toaster />
                {loginid === false ? (
                  <>{children}</>
                ) : (
                  <Masterlayout>{children}</Masterlayout>
                )}
              </Providers>
            </CacheProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
