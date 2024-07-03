import BaseButton from "@/components/ui/BaseButton";
import BaseNumberField from "@/components/ui/BaseNumberField";
import BaseTextField from "@/components/ui/BaseTextField";
import { IRegistrationFormProps } from "@/types/formTypes";
import { Box } from "@mui/material";
import React from "react";
import FormTitle from "./FormTitle";

interface IPersonalInfoFormProps extends IRegistrationFormProps {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
}
type FieldName =
  | "middleName"
  | "username"
  | "password"
  | "confirmPassword"
  | "emailAddress"
  | "firstName"
  | "lastName"
  | "mobileNumber";

const PersonalInfoForm = ({ formik, setFormStep }: IPersonalInfoFormProps) => {
  const handleFormNextStep = async () => {
    // Manually trigger form validation
    const formErrors = await formik.validateForm();
    formik.setTouched(formik.initialTouched); // Optionally mark all fields as touched

    if (!Object.keys(formErrors).length) {
      setFormStep((prev) => prev + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.handleChange(e);

    const fieldName = name as FieldName;
    // If there's an error for this field and it's now filled, clear the error
    if (formik.errors[fieldName] && value.trim()) {
      formik.setFieldError(fieldName, "");
    }
  };

  return (
    <>
      {/* <FormTitle>Personal Information</FormTitle> */}

      <BaseTextField
        label="First Name"
        value={formik.values.firstName}
        onChange={handleChange}
        fieldError={formik.errors.firstName}
        required
        placeholder="Enter your first name"
      />
      <BaseTextField
        label="Middle Name"
        value={formik.values.middleName}
        onChange={handleChange}
        fieldError={formik.errors.middleName}
        placeholder="Enter your middle name"
      />
      <BaseTextField
        label="Last Name"
        value={formik.values.lastName}
        onChange={handleChange}
        fieldError={formik.errors.lastName}
        placeholder="Enter your last name"
        required
      />
      <BaseNumberField
        label="Mobile Number"
        value={formik.values.mobileNumber}
        onChange={handleChange}
        fieldError={formik.errors.mobileNumber}
        required
        placeholder="e.g. 09xxxxxxxxx"
      />
      <BaseTextField
        label="Email Address"
        value={formik.values.emailAddress}
        onChange={handleChange}
        fieldError={formik.errors.emailAddress}
        required
        placeholder="e.g. CoffeeShop@gmail.com"
      />
      <Box sx={{ display: "flex" }}>
        <BaseButton
          sx={{ marginTop: 4, marginLeft: "auto" }}
          onClick={handleFormNextStep}
          fullWidth
        >
          Next
        </BaseButton>
      </Box>
    </>
  );
};

export default PersonalInfoForm;
