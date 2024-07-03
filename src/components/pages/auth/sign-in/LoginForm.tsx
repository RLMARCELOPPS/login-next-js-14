"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import axios from "axios";

import BaseButton from "@/components/ui/BaseButton";
import BaseTextField from "@/components/ui/BaseTextField";
import PasswordField from "@/components/ui/PasswordField";
import { API_CONFIG } from "@/config/config";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { loginSchema, loginType } from "@/utils/validations/loginSchema";

type FieldName = "username" | "password";
interface LoginType {
  username: string;
  password: string;
}

const LoginFormPage = () => {
  const [, setAuthState] = useLocalStorage("isUserLoggedIn");
  const [, setUserData] = useLocalStorage("userData");
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState({
    username: "",
    password: "",
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (values: LoginType) => {
    // Retrieve the intended destination from session storage
    const intendedDestination = sessionStorage.getItem("intendedDestination");

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${API_CONFIG.baseURL + API_CONFIG.endPoints.login}`,
        values
      );
      const data = res.data.data;
      if (res.status === 200) {
        setAuthState(true);
        setUserData(data);
        push(`${intendedDestination + data.userId}` || "/");
      }
    } catch (error) {
      // Handle error from api
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 401) {
          if (response.data.message === "Unauthorized: Password is incorrect") {
            setAuthError({ password: "Password is incorrect", username: "" });
          } else if (
            response.data.message === "Error: Account has been disabled"
          ) {
            alert("Account has been disabled! Please try again after 30mins");
          }
        } else if (response?.status === 404) {
          setAuthError({
            username: "Account does not exist",
            password: "Account does not exist",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik<loginType>({
    initialValues,
    validationSchema: loginSchema,
    validateOnBlur: false, // Disable validation on blur
    validateOnChange: false, // Disable validation on change
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const clearErrors = (fieldName: FieldName) => {
    if (formik.errors[fieldName]) {
      formik.setFieldError(fieldName, "");
    }
    setAuthError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
  };

  //Custom handle change to clear errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formik.handleChange(e);

    clearErrors(name as FieldName);
  };

  return (
    <LoginForm onSubmit={formik.handleSubmit}>
      <BaseTextField
        label="Username"
        value={formik.values.username}
        onChange={handleChange}
        fieldError={formik.errors.username || authError.username}
        placeholder="Enter your username"
      />
      <PasswordField
        label="Password"
        value={formik.values.password}
        onChange={handleChange}
        fieldError={formik.errors.password || authError.password}
        placeholder="Enter your password"
      />
      <Box sx={{ marginTop: 4 }}>
        <BaseButton fullWidth type="submit">
          {isLoading ? "Loading..." : "Login"}
        </BaseButton>
      </Box>
    </LoginForm>
  );
};

export default LoginFormPage;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;
