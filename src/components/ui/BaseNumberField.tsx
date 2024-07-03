import React from "react";
import BaseTextField, { ITextFieldProps } from "./BaseTextField";

interface IBaseNumberFieldProps
  extends Omit<ITextFieldProps, "onKeyDown" | "type"> {
  // You can add additional props specific to the number field if needed
}

const BaseNumberField = (props: IBaseNumberFieldProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only digits and control keys
    if (
      !/[0-9]/.test(e.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
    ) {
      e.preventDefault();
    }
    // If there's an onKeyDown prop, call it
  };

  return (
    <BaseTextField
      {...props}
      type="text" // Keep it as "text" to avoid spinners
      onKeyDown={handleKeyDown}
    />
  );
};

export default BaseNumberField;
