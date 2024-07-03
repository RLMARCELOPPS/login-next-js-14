import { FormValues } from "@/utils/validations/userSchema";
import { FormikProps } from "formik";

export interface IRegistrationFormProps {
  formik: FormikProps<FormValues>;
}

export interface IAuthError {
  username?: string;
  password?: string;
}
