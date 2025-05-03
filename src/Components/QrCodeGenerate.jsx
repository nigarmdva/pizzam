import React, { useState } from 'react'
import { axiosFunction } from "../api";
import { useNavigate } from "react-router-dom";

import useAuthStore, { useQrCodes } from "../store/store";


const QrCodeGenerate = () => {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const accessToken= useAuthStore((state=>state.accessToken));
    const { qrCodes, setQrCodesImg } = useQrCodes();
    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    const data = {
      name,
      originalUrl: url,
    };
    e.preventDefault();
    try {
      const response = await axiosFunction("POST", "qr-codes", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        console.log("QR Code created successfully:", response);
        setQrCodesImg(response.qrImage);
        console.log("QR Codes:", qrCodes);
        const {id}=response;
        navigate(`/qr/${id}`);
      }
    } catch (error) {
      console.log(" Error:", error.message);
    }
  };
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center h-100">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            id="name"
            placeholder="Enter QR Name"
            className="mb-4 p-2 border border-gray-300 rounded outline-none  "
          />
          <input
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            name="url"
            id="url"
            placeholder="Enter QR URL"
            className="mb-4 p-2 border border-gray-300 rounded outline-none"
          />
          <button
            type="submit"
            className="bg-[#000] text-white px-4 py-2 rounded cursor-pointer"
          >
            Generate QR
          </button>
          <p>{qrCodes}</p>
        </div>
      </form>
    </div>
  )
}

export default QrCodeGenerate