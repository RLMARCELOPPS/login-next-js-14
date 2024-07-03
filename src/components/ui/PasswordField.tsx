import React, { useState } from "react";
import BaseTextField, { ITextFieldProps } from "./BaseTextField";
import { HiEye, HiEyeOff } from "react-icons/hi";
import useToggle from "@/hooks/useToggle";

const PasswordField = (props: ITextFieldProps) => {
  const [isPasswordVisible, togglePassword] = useToggle();

  return (
    <BaseTextField
      {...props}
      type={isPasswordVisible ? "text" : "password"} // Keep it as "text" to avoid spinners
      endIcon={
        isPasswordVisible ? (
          <HiEye onClick={togglePassword} />
        ) : (
          <HiEyeOff onClick={togglePassword} />
        )
      }
    />
  );
};

export default PasswordField;
