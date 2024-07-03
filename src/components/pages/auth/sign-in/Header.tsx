"use client";
import { Avatar, Typography, useTheme } from "@mui/material";

const Header = () => {
  const theme = useTheme();

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        {/* <LockOutlinedIcon /> */}
      </Avatar>
      <Typography sx={{ marginBottom: "15px" }} component="h1" variant="h5">
        Login
      </Typography>
    </>
  );
};

export default Header;
