import React, { useState } from "react";
import { useFormik } from "formik";
import { axiosFunction } from "../api/index";
import { signinSchema } from "../schemas/signInSchema";
import useAuthStore from "../store/auth";



export const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form submitted with:", values);
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axiosFunction("POST", "auth/login", values);
        console.log("API Response received:", response);

        if (response && response.accessToken) {
          login(response.user, response.accessToken);

          localStorage.setItem("token", response.accessToken);
          window.location.href = "/user"; 
        } else {
          console.error("No access token in response:", response);
          throw new Error("Invalid response format");
        }
      } catch (apiError) {
        console.error("API call failed with error:", apiError);
        console.error("Error details:", apiError.message);
        if (apiError.response) {
          console.error("Response status:", apiError.response.status);
          console.error("Response data:", apiError.response.data);
        }
        throw apiError;
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center h-screen bg-gray-100 shadow-2xl shadow-black">
        <div className="bg-white p-8 sm:w-4/5 md:w-3/4 lg:w-1/2 w-full text-center">
          <h2 className="text-2xl font-bold text-gray-400">Welcome Back!</h2>
          <p className="text-gray-600 font-bold text-sm pt-1">Login to your account</p>
          <div>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="email"
              placeholder="Email or Phone Number"
              className={`bg-gray-100 p-3 rounded-xl border-0 outline-none w-full sm:w-4/5 mt-3 ${
                formik.errors.email && formik.touched.email ? "border-2 border-red-500" : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm text-left pl-12">{formik.errors.email}</p>
            )}

            <input
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              placeholder="Password"
              className={`bg-gray-100 p-3 rounded-xl border-0 outline-none w-full sm:w-4/5 mt-3 ${
                formik.errors.password && formik.touched.password ? "border-2 border-red-500" : ""
              }`}
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm text-left pl-3">{formik.errors.password}</p>
            )}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-left pl-12 mt-3">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="bg-blue-500 text-white p-3 mt-8 rounded-xl w-full sm:w-2/5"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </div>
    </form>
  );
};
