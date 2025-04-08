import React, { useEffect } from "react";
import { useState } from "react";
import { axiosFunction } from "../api";
import useAuthStore, { useQrCodes } from "../store/auth";   



const UserProfile = () => {
  const { user, token } = useAuthStore();
  const [details, setDetails] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState(''); 
  const { qrCodes, setQrCodesImg } = useQrCodes();

  useEffect(() => {
    console.log("User:", user);
    console.log("Token:", token);
  }, [user, token]);

  


  const handleSubmit= async (e) => {
    const data = {
      name,
      originalUrl: url  
    }
    console.log("sending data:", data);
    e.preventDefault();
    try {
      const response = await axiosFunction("POST", "qr-codes", data,{
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("QR Code created successfully:", response);
        setQrCodesImg(response.qrImage);
        console.log("QR Codes:", qrCodes);
      }
    }
    catch (error) {
      console.log(" Error:", error.message);
    }
  }
  return (
    <>

      <div className="flex flex-row justify-between w-full p-10 items-center  ">
        <div><h1>Hello, <span className="font-[600]">{user?.fullName}</span></h1></div>
        <div className="flex flex-row items-center w-1/2 gap-4">
          <span className="bg-[#000] text-white px-4 py-2 rounded my-4" onClick={() => setDetails(!details)}>User details</span>
          <button onClick={() => useAuthStore.getState().logout()} className="bg-[#bbb] text-white px-4 py-2 rounded my-4">Logout</button>
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out transform border border-gray-300 rounded-md p-4 mx-10 w-[350px] ${
          details ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <p>Email: <span className="font-[600]">{user?.email}</span></p>
        <p>Full Name: <span className="font-[600]">{user?.fullName}</span></p>
      </div>  

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center h-100">
          <input onChange={(e) => setName(e.target.value)}  type="text" name="name" id="name"  placeholder="Enter QR Name" className="mb-4 p-2 border border-gray-300 rounded outline-none  "/>
          <input onChange={(e) => setUrl(e.target.value)} type="text" name="url" id="url" placeholder="Enter QR URL" className="mb-4 p-2 border border-gray-300 rounded outline-none"/>
          <button  type="submit" className="bg-[#000] text-white px-4 py-2 rounded cursor-pointer">Generate QR </button>
          
        </div>
      </form>
    </>
  );
};

export default UserProfile;
