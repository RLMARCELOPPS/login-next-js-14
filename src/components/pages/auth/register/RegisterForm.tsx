"use client";

import {
  FormValues,
  accountInfoSchema,
  personalInfoSchema,
} from "@/utils/validations/userSchema";
import { useFormik } from "formik";
import React, { useState } from "react";
import styled from "@emotion/styled";
import PersonalInfoForm from "./PersonalInfoForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_CONFIG } from "@/config/config";
import { v4 as uuidv4 } from "uuid";
import dynamic from "next/dynamic";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAuthError } from "@/types/formTypes";

const AccountInfoForm = dynamic(() => import("./AccountInfoForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const RegistrationForm = () => {
  const [, setAuthState] = useLocalStorage("isUserLoggedIn");
  const [, setUserData] = useLocalStorage("userData");
  const [authError, setAuthError] = useState<IAuthError>({
    username: "",
    password: "",
  });

  const { push } = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
    emailAddress: "",
    firstName: "",
    lastName: "",
    middleName: "",
    mobileNumber: "",
  };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${API_CONFIG.baseURL + API_CONFIG.endPoints.register}`,
        {
          userId: uuidv4(),
          ...values,
        }
      );
      console.log({ res });

      if (res.status === 200) {
        setAuthState(true);
        setUserData(res.data.data);
        push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response?.status === 400) {
          if (response.data.message === "User already exists") {
            setAuthError({ password: "", username: response.data.message });
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  //handle custom validation for each step and custom error message
  const currentSchema = formStep === 1 ? personalInfoSchema : accountInfoSchema;

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: currentSchema,
    validateOnBlur: false, // Disable validation on blur
    validateOnChange: false, // Disable validation on change
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <RegisterForm onSubmit={formik.handleSubmit}>
      {formStep === 1 ? (
        <PersonalInfoForm setFormStep={setFormStep} formik={formik} />
      ) : null}
      {formStep === 2 ? (
        <AccountInfoForm
          formStep={formStep}
          setFormStep={setFormStep}
          formik={formik}
          isLoading={isLoading}
          authError={authError}
          setAuthError={setAuthError}
        />
      ) : null}
    </RegisterForm>
  );
};

export default RegistrationForm;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;
