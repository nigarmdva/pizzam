import * as Yup from "yup";

const passwordRules = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"; 
export const basicSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("Required"),
  fullName: Yup.string().required("Required"),
  password: Yup.string()
    .matches(new RegExp(passwordRules), {
      message:
        "Password must contain at least eight characters, at least one letter and one number"
    }) 
    .required("Required"), 
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});
