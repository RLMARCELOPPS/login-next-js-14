import BaseButton from "@/components/ui/BaseButton";
import BaseTextField from "@/components/ui/BaseTextField";
import { IAuthError, IRegistrationFormProps } from "@/types/formTypes";
import { Box } from "@mui/material";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FocusEvent,
} from "react";
import FormTitle from "./FormTitle";
import RequiredFieldPattern from "./RequiredFieldPattern";
import { useFieldPatternValidation } from "@/hooks/useFieldPatternValidation";
import PasswordField from "@/components/ui/PasswordField";

interface IAccountInfoFormProps extends IRegistrationFormProps {
  setFormStep: Dispatch<SetStateAction<number>>;
  formStep: number;
  isLoading: boolean;
  authError: IAuthError;
  setAuthError: Dispatch<SetStateAction<IAuthError>>;
}

// Validation Pattern for username and password
const usernamePatterns = {
  minLength: new RegExp(".{4,}"), // At least 4 characters
  maxLength: new RegExp("^.{0,10}$"), // No more than 10 characters
};

const passwordPatterns = {
  minLength: new RegExp(".{8,}"), // At least 8 characters
  lowerCase: new RegExp("[a-z]"), // Contains a lower case letter
  upperCase: new RegExp("[A-Z]"), // Contains an upper case letter
  number: new RegExp("\\d"), // Contains a number
  specialChar: new RegExp("[@#$%^&]"), // Contains a special character
};

const AccountInfoForm = ({
  formik,
  isLoading,
  authError,
  setAuthError,
}: IAccountInfoFormProps) => {
  // Initialize the hook with the patterns
  const {
    patternState: usernamePatternState,
    setFieldTouched: setUsernameTouched,
    fieldTouched: usernameTouched,
    updateFieldRequirements: updateUsernameRequirements,
  } = useFieldPatternValidation(Object.keys(usernamePatterns));

  const {
    patternState: passwordPatternState,
    setFieldTouched: setPasswordTouched,
    fieldTouched: passwordTouched,
    updateFieldRequirements: updatePasswordRequirements,
  } = useFieldPatternValidation(Object.keys(passwordPatterns));

  //handle custom showing of error message
  const handleFieldChange = (
    e: ChangeEvent<HTMLInputElement>,
    patternValidation: (
      value: string,
      pattern: { [key: string]: RegExp }
    ) => void,
    pattern: { [key: string]: RegExp }
  ) => {
    const { name, value } = e.target;
    patternValidation(value, pattern);
    formik.handleChange(e);
    setAuthError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFieldBlur = (
    e: FocusEvent<HTMLInputElement>,
    patternValidation: (
      value: string,
      pattern: { [key: string]: RegExp }
    ) => void,
    pattern: { [key: string]: RegExp },
    setTouched: Dispatch<SetStateAction<boolean>>
  ) => {
    const { value } = e.target;
    patternValidation(value, pattern);
    setTouched(true);
    formik.handleBlur(e);
  };

  return (
    <>
      {/* <FormTitle>Account Creation</FormTitle> */}
      <BaseTextField
        label="Username"
        {...formik.getFieldProps("username")}
        fieldError={formik.errors.username || authError.username}
        placeholder="Enter your username"
        required
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFieldChange(e, updateUsernameRequirements, usernamePatterns)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          handleFieldBlur(
            e,
            updateUsernameRequirements,
            usernamePatterns,
            setUsernameTouched
          )
        }
      />
      <Box sx={{ marginTop: "-12px" }}>
        <RequiredFieldPattern
          touched={usernameTouched}
          matches={usernamePatternState.minLength}
        >
          At least 4 characters
        </RequiredFieldPattern>
        <RequiredFieldPattern
          touched={usernameTouched}
          matches={usernamePatternState.maxLength}
        >
          Should not exceed 10 characters
        </RequiredFieldPattern>
      </Box>
      <PasswordField
        label="Password"
        {...formik.getFieldProps("password")}
        fieldError={
          formik.errors.password === "Password is required"
            ? formik.errors.password
            : ""
        }
        required
        placeholder="Enter your password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleFieldChange(e, updatePasswordRequirements, passwordPatterns)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          handleFieldBlur(
            e,
            updatePasswordRequirements,
            passwordPatterns,
            setPasswordTouched
          )
        }
      />
      <Box sx={{ marginTop: "-12px" }}>
        <RequiredFieldPattern
          touched={passwordTouched}
          matches={passwordPatternState.minLength}
        >
          At least 8 characters
        </RequiredFieldPattern>
        <RequiredFieldPattern
          touched={passwordTouched}
          matches={passwordPatternState.lowerCase}
        >
          Contains one lower case letter
        </RequiredFieldPattern>
        <RequiredFieldPattern
          touched={passwordTouched}
          matches={passwordPatternState.upperCase}
        >
          Contains one upper case letter
        </RequiredFieldPattern>
        <RequiredFieldPattern
          touched={passwordTouched}
          matches={passwordPatternState.number}
        >
          Contains one number
        </RequiredFieldPattern>
        <RequiredFieldPattern
          touched={passwordTouched}
          matches={passwordPatternState.specialChar}
        >
          Contains one special character (@,#,$,%,etch.)
        </RequiredFieldPattern>
      </Box>
      <PasswordField
        label="Confirm Password"
        {...formik.getFieldProps("confirmPassword")}
        fieldError={formik.errors.confirmPassword}
        required
        placeholder="Confirm your password"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <BaseButton fullWidth type="submit">
          {isLoading ? "Loading..." : "Create Account"}
        </BaseButton>
      </Box>
    </>
  );
};

export default AccountInfoForm;
