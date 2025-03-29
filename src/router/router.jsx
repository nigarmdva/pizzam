import { createBrowserRouter } from "react-router-dom";
import { Register}  from "../Pages/Auth/Register/Register"
export const Router= createBrowserRouter([
    {
        path: "/",
        element: <Register/>,
    },
]);