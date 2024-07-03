import { IWithChildrenProps } from "@/types/baseTypes";
import { Typography, useTheme } from "@mui/material";
import React from "react";

const FormTitle = ({ children }: IWithChildrenProps) => {
  const theme = useTheme();

  return (
    <Typography
      variant="h6"
      sx={{
        marginBottom: "10px",
        fontWeight: 600,
        color: theme.palette.text.primary,
      }}
    >
      {children}
    </Typography>
  );
};

export default FormTitle;
