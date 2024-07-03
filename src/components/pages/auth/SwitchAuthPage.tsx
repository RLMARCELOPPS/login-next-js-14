"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import React from "react";
import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

interface ISwitchAuthPageProps {
  href: string;
  linkTitle: string;
  linkText: string;
}

const SwitchAuthPage = ({
  href,
  linkTitle,
  linkText,
}: ISwitchAuthPageProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "12px",
        gap: "4px",
      }}
    >
      {linkText}
      <SwitchPageLink href={href}>{linkTitle}</SwitchPageLink>
    </Box>
  );
};

export default SwitchAuthPage;

const SwitchPageLink = styled(Link)<{ theme?: Theme }>(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  fontWeight: 600,
}));
