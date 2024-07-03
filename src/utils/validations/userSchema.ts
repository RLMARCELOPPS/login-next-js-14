import { InferType, object, ref, string } from "yup";

export const personalInfoSchema = object({
  emailAddress: string()
    .email("Invalid email address")
    .required("Email address is required"),
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  middleName: string().nullable().optional(),
  mobileNumber: string()
    .matches(
      /^0\d{10}$/,
      "Mobile Number must start with 0 and must be an 11-digit number"
    )
    .required("Mobile Number is required"),
});

export const accountInfoSchema = object({
  username: string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters long")
    .max(10, "Username must not exceed 10 characters"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(15, "Password must not exceed 15 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  confirmPassword: string()
    .oneOf([ref("password"), ""], "Passwords do not match")
    .required("Confirm password is required"),
});

export const userSchema = object().shape({
  ...personalInfoSchema.fields,
  ...accountInfoSchema.fields,
});

export type FormValues = InferType<typeof userSchema>;
