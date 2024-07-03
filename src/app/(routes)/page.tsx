"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const [userData] = useLocalStorage("userData");
  return (
    <Box
      sx={{
        backgroundColor: "white",
        minHeight: "calc(100vh - 4rem)",
        color: "black",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
        alt="test"
        layout="fill"
        objectFit="cover"
        style={{
          filter: "brightness(0.3)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          padding: "20px",
          color: "white",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            py: 4,
            width: "50%",
            fontWeight: "medium",
            fontSize: "4rem", // Adjust according to text-7xl from Tailwind
            textTransform: "uppercase",
            letterSpacing: "widest",
          }}
        >
          Welcome to home page
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{
            py: 6,
            width: "50%",
            fontSize: "1rem",
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed dolore
          repudiandae labore nam, exercitationem alias dolor doloribus fugit. Ex
          quibusdam sint tempore itaque atque cupiditate adipisci blanditiis
          voluptatem officiis expedita? Voluptate dolor nemo fugit libero?
          Officiis, quibusdam iste dignissimos, eveniet autem ipsam eum a magni
          similique, laborum ea fugiat sint!
        </Typography>
        <Box sx={{ display: "flex", gap: "16px" }}>
          {!userData ? (
            <Link href="/login">
              <Button variant="contained" size="large">
                Login
              </Button>
            </Link>
          ) : null}
          <Link href="/contact">
            <Button variant="contained" size="large" color="success">
              Contact us
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
