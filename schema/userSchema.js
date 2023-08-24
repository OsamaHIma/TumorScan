import { object, string, bool } from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const loginUserSchema = object().shape({
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  password: string()
    .required("No password provided.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    ),
});

export const contactSchema = object().shape({
  name: string().matches(
    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    "Please enter a valid name."
  ),
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  message: string().required("Please enter a message."),
  // phone: string().matches(/^\d{10}$/, "Please enter a valid phone number.").optional(),
});

export const signUpSchema = object().shape({
  name: string().matches(
    /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    "Please enter a valid name."
  ),
  email: string()
    .email("Please enter a valid email address.")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address."
    ),
  password: string()
    .required("Please enter a password.")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number."
    ),
  termsCheckbox: bool().oneOf(
    [true],
    "You must accept the Terms and Conditions"
  ),
});
