import {
  Box,
  FormLabel,
  InputAdornment,
  InputProps,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { toCamelCase } from "@/utils/string-format/toCamelCase";

export interface ITextFieldProps extends InputProps {
  label: string;
  fieldError?: string | undefined;
  required?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const BaseTextField = ({
  label,
  value,
  onChange,
  fieldError,
  placeholder,
  required = false,
  type = "text",
  onKeyDown,
  onBlur,
  startIcon,
  endIcon,
}: ITextFieldProps) => {
  const htmlFor = toCamelCase(label);
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Box sx={{ display: "flex", gap: "0.25rem" }}>
        <FormLabel
          htmlFor={htmlFor}
          sx={{
            fontSize: 14,
            fontWeight: 500,
            color: Boolean(fieldError)
              ? theme.palette.error.main
              : theme.palette.text.primary,
          }}
        >
          {label}
        </FormLabel>
        {required ? <RequiredSymbol>*</RequiredSymbol> : null}
      </Box>
      <StyledTextField
        id={htmlFor}
        name={htmlFor}
        type={type}
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={Boolean(fieldError)}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        InputProps={{
          startAdornment: startIcon ? (
            <StyledAdornment position="start">{startIcon}</StyledAdornment>
          ) : null,
          endAdornment: endIcon ? (
            <StyledAdornment position="end">{endIcon}</StyledAdornment>
          ) : null,
        }}
      />
      {fieldError ? <ErrorMessage>{fieldError}</ErrorMessage> : null}
    </Box>
  );
};

export default BaseTextField;

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "2.875rem",
    borderRadius: "0.5rem",
    // You can use theme.spacing for consistent padding values
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d9d9d9",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "black", // Change the border color on hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
  // You can add more styles targeting other parts of the TextField as needed

  "& input[type=number]": {
    "-moz-appearance": "textfield !important", // Firefox
  },
  "&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none !important", // Webkit browsers
    margin: 0,
  },
  "&::-webkit-outer-spin-button": {
    "-webkit-appearance": "none !important", // Webkit browsers
    margin: 0,
  },
}));

const ErrorMessage = styled.div<{ theme?: Theme }>(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "0.75rem",
}));

const RequiredSymbol = styled.div`
  color: #ce0a05;
  font-size: 1rem;
`;

const StyledAdornment = styled(InputAdornment)`
  cursor: pointer;
  & > * {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
