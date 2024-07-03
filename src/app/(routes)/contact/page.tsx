"use client";
import { FormValues } from "@/utils/validations/userSchema";
import {
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export default function ContactPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleSubmit = () => {
    setOpenSnackbar(true); // Show the snackbar on successful submission
  };
  const handleCloseSnackbar = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        px: 20,
        minHeight: "calc(100vh - 4rem)",
        color: "black",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Box sx={{ width: "70%", padding: "20px", paddingRight: "20px" }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "medium",
              fontSize: "2.5rem", // Adjust for text-4xl
            }}
          >
            CONTACT PAGE
          </Typography>
          <Typography
            variant="body1"
            component="p"
            sx={{
              py: 6,
              width: "80%", // Adjust for w-4/5
              fontSize: "0.875rem", // Adjust for text-sm
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            tempore fugit architecto fugiat, sunt commodi, temporibus porro
            iusto ad dolore dolor cum! Dignissimos dolores quae minus accusamus
            doloribus similique.
          </Typography>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px", // Adjust for gap-5
              width: "80%", // Adjust for w-4/5
            }}
          >
            <TextField label="Email" variant="outlined" />
            <TextField label="Name" variant="outlined" />
            <TextField label="Message" variant="outlined" multiline rows={5} />
            <Button variant="contained" size="large" onClick={handleSubmit} i>
              Submit
            </Button>
          </form>
        </Box>
        <Box
          sx={{
            width: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Contact"
            width={1124}
            height={750}
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={6000}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully Send!
        </Alert>
      </Snackbar>
    </Box>
  );
}
