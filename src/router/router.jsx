import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home";
import UserProfile from "../Components/UserProfile";
import AuthLogin from "../Pages/Auth/login/AuthLogin";
import { Register}  from "../Pages/Auth/Register/Register"
export const Router= createBrowserRouter([
    {
        path: "/register",
        element: <Register/>,

    },
    {
        path: "/login",
        element: <AuthLogin />  ,
    },
    {
        path: "/home",
        element:<Home/>
    }
    ,{
        path: "/user",
        element:<UserProfile/>
    }
]);