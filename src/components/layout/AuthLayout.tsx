"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IWithChildrenProps } from "@/types/baseTypes";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Header from "@/components/pages/auth/sign-in/Header";

interface IAuthLayoutProps extends IWithChildrenProps {
  isLogin?: boolean;
}

const AuthLayout = ({ children, isLogin = false }: IAuthLayoutProps) => {
  const [isLoggedIn, setAuthState] = useLocalStorage("isUserLoggedIn");
  const { push } = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAuthState("");
    }, 1000 * 3);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  //Prevent user from accessing login and register page when logged in
  useEffect(() => {
    const intendedDestination = sessionStorage.getItem("intendedDestination");

    if (isLoggedIn === true && intendedDestination !== "/profile/") {
      push("/");
    }
  }, [isLoggedIn, push]);

  //if the layout is for login page, center the form
  const centeredForm = isLogin
    ? {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : "";

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://www.dcipheranalytics.com/images/login-background.svg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
