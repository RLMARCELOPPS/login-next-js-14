"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import LoadingImg from "public/loading.gif";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
      }}
    >
      <Image src={LoadingImg} alt="Loading" />
      <Typography variant="h5" sx={{ fontWeight: 600, marginTop: "-16px" }}>
        Loading...
      </Typography>
    </Box>
  );
}
