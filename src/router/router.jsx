import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home";
import UserPage from "../Components/UserPage";
import UserProfileNav from "../Components/UserProfileNav";
import ProductsPage from "../Layout/ProductsPage";
import AuthLogin from "../Pages/Auth/login/AuthLogin";
import { Register } from "../Pages/Auth/Register/Register";
// export const Router = createBrowserRouter([
//   
// ]);

import React from 'react'

const router =createBrowserRouter([
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <AuthLogin />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
]) 

export default router
