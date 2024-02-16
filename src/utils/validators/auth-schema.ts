import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});
