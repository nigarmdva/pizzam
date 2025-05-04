import React, { useState } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signUpSchema";
import { axiosFunction } from "../api/index";
import useAuthStore from "../store/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const SignUp = () => {
  const { login } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        try {
          await axiosFunction("POST", "auth/register", values);
          const loginResponse = await axiosFunction("POST", "auth/login", {
            email: values.email,
            password: values.password,
          });

          const { accessToken: token, user } = loginResponse;
          login(user, token);

          window.location.href = "/user";
        } catch (error) {
          console.log("Login/Register Error:", error);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center items-center h-screen bg-gray-100 shadow-2xl shadow-black">
        <div className="bg-white p-15 sm:w-[80%] md:w-[75%] lg:w-[50%] w-full text-center">
          <h2 className="text-2xl font-bold text-gray-400">Xoş Gəlmisiniz!</h2>
          <p className="text-gray-600 font-bold text-sm pt-1">
            Sifariş vermək üçün qeydiyyatdan keçin
          </p>

          <input
            value={values.email}
            onChange={handleChange}
            id="email"
            type="text"
            placeholder="Email"
            className={`bg-gray-100 p-3 rounded-xl border-0 outline-0 w-full sm:w-[85%] mt-3 ${
              errors.email && touched.email ? "border-2 border-red-500" : ""
            }`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm text-left pl-0 sm:pl-12">
              {errors.email}
            </p>
          )}
          <input
            value={values.fullName}
            type="text"
            onChange={handleChange}
            id="fullName"
            placeholder="Ad Soyad"
            className="bg-gray-100 p-3 rounded-xl border-0 outline-0 w-full sm:w-[85%] mt-3"
          />
          <div className="relative w-full sm:w-[85%] mx-auto mt-3">
            <input
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Şifrə"
              className={`bg-gray-100 p-3 pr-10 rounded-xl border-0 outline-0 w-full ${
                errors.password && touched.password
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={togglePassword}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm text-left pl-0 sm:pl-12">
              {errors.password}
            </p>
          )}
          <div className="relative w-full sm:w-[85%] mx-auto mt-3">
            <input
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Təkrar Şifrə"
              className={`bg-gray-100 p-3 pr-10 rounded-xl border-0 outline-0 w-full ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-sm text-left pl-0 sm:pl-12">
              {errors.confirmPassword}
            </p>
          )}
          <button
            type="submit"
            className="bg-[#000] text-white p-3 mt-8 rounded-xl w-full sm:w-[45%]"
          >
            Qeydiyyatdan Keç
          </button>
          <p className="text-gray-600 text-sm pt-1">
            Artıq hesabın var?{" "}
            <a href="/login" className="underline">
              Daxil ol
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};
