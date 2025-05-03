import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../schemas/signUpSchema";
import { axiosFunction } from "../api/index";
import useAuthStore from "../store/store";
export const SignUp = () => {
  const { login } = useAuthStore();

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
          <div>
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
              <p className="text-red-500 text-sm text-left pl-12">
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
            <input
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder="Password"
              className={`bg-gray-100 p-3 rounded-xl border-0 outline-0 w-full sm:w-[85%] mt-3 ${
                errors.password && touched.password
                  ? "border-2 border-red-500"
                  : ""
              }`}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm text-left pl-12">
                {errors.password}
              </p>
            )}
            <input
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              type="password"
              placeholder=" Password"
              className={`bg-gray-100 p-3 rounded-xl border-0 outline-0 w-full sm:w-[85%] mt-3 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-2 border-red-500 text-left pl-12"
                  : ""
              }`}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-red-500 text-sm text-left pl-12">
                {errors.confirmPassword}
              </p>
            )}
          </div>
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
