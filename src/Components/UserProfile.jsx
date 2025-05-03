import React, { useEffect } from "react";
import { useState } from "react";
import useAuthStore from "../store/store";
import QrCodeGenerate from "./QrCodeGenerate";

const UserProfile = () => {
  const {user,logout}=useAuthStore();

  const [details, setDetails] = useState(false);
  
  return (
    <>
      <div className="flex flex-row justify-between w-full p-10 items-center  ">
        <div>
          <h1>
            Hello, <span className="font-[600]">{user?.fullName}</span>
          </h1>
        </div>
        <div className="flex flex-row items-center w-1/2 gap-4">
          <span
            className="bg-[#000] text-white px-4 py-2 rounded my-4"
            onClick={() => setDetails(!details)}
          >
            User details
          </span>
          <button
            onClick={logout}
            className="bg-[#bbb] text-white px-4 py-2 cursor-pointer rounded my-4"
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out transform border border-gray-300 rounded-md p-4 mx-10 w-[350px] ${
          details
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <p>
          Email: <span className="font-[600]">{user?.email}</span>
        </p>
        <p>
          Full Name: <span className="font-[600]">{user?.fullName}</span>
        </p>
      </div>

      <QrCodeGenerate/>
    </>
  );
};

export default UserProfile;
