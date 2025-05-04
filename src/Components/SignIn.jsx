import React, { useState } from "react";
import { useFormik } from "formik";
import { axiosFunction } from "../api/index";
import { signinSchema } from "../schemas/signInSchema";
import useAuthStore from "../store/store";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignIn = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axiosFunction("POST", "auth/login", values);
        if (response && response.accessToken) {
          const user = response.user;
          const accessToken = response.accessToken;
          login(user, accessToken);
          navigate("/user");
        } else {
          throw new Error("Invalid response format");
        }
      } catch (apiError) {
        console.error("API call failed with error:", apiError);
        if (apiError.response) {
          console.error("Response status:", apiError.response.status);
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
          <h2 className="text-2xl font-bold text-gray-400">Xoş Gəldiniz!</h2>
          <p className="text-gray-600 font-bold text-sm pt-1">
            Hesabınıza daxil olun
          </p>
          <div>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className={`bg-gray-100 p-3 rounded-xl border-0 outline-none w-full sm:w-4/5 mt-3 ${
                formik.errors.email && formik.touched.email
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm sm:pl-17 text-left pl-0">
                {formik.errors.email}
              </p>
            )}

            <div className="relative w-full sm:w-4/5 mx-auto">
              <input
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`bg-gray-100 p-3 rounded-xl border-0 outline-none w-full mt-3 ${
                  formik.errors.password && formik.touched.password
                    ? "border-2 border-red-500"
                    : ""
                }`}
              />
              <div
                className="absolute right-4 top-[50%] translate-y-[-50%] text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm sm:pl-17 text-left">
                {formik.errors.password}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-left pl-0 mt-3">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="bg-[#000] text-white cursor-pointer p-3 mt-8 rounded-xl w-full sm:w-2/5"
          >
            {loading ? "Daxil olunur..." : "Daxil ol"}
          </button>
          <p className="text-gray-600 text-sm pt-1">
            Hesabın yoxdur?
            <a href="/register" className="underline">
              Qeydiyyatdan Keç
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};
