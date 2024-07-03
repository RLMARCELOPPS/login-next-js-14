import { Button, ButtonProps } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
interface IButtonProps extends ButtonProps {}

const BaseButton = ({
  children,
  variant = "contained",
  ...props
}: IButtonProps) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};

export default BaseButton;

const StyledButton = styled(Button)`
  text-transform: capitalize;
  box-shadow: none;
  height: 2.875rem;
  font-size: 1rem;
  border-radius: 0.5rem;

  &:hover {
    box-shadow: none;
  }
`;
