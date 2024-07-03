import { IWithChildrenProps } from "@/types/baseTypes";
import { Typography, useTheme } from "@mui/material";
import React from "react";

interface IRequiredFieldPatternProps extends IWithChildrenProps {
  matches?: boolean;
  touched?: boolean;
}

const RequiredFieldPattern = ({
  children,
  matches,
  touched,
}: IRequiredFieldPatternProps) => {
  const theme = useTheme();

  let color = theme.palette.text.secondary; // Default color
  if (matches) {
    color = theme.palette.success.main; // Green if requirement is met
  } else if (touched && !matches) {
    color = theme.palette.error.main; // Red if touched and requirement is not met
  }

  return (
    <Typography variant="body2" color={color}>
      &#9679; {children}
    </Typography>
  );
};

export default RequiredFieldPattern;
