import * as Yup from "yup";

const passwordRules = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const signinSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  password: Yup.string()
    .matches(passwordRules, {
      message:
        "Password must contain at least eight characters, at least one letter and one number",
    })
    .required("Required"),
});

