"use client";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {/* <AssignmentOutlined /> */}
      </Avatar>
      <Typography sx={{ marginBottom: "20px" }} component="h1" variant="h5">
        Register
      </Typography>
    </>
  );
};

export default Header;
