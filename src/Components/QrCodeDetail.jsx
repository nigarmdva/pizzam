import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosFunction } from "../api";
import useAuthStore from "../store/store";

const QrCodeDetail = () => {
  const { id } = useParams();
  const accessToken= useAuthStore((state)=>state.accessToken)
  const [qrData, setQrData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosFunction("GET", `qr-codes`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            console.log("Server response:", response);
          } catch (error) {
            console.error("QR code fetch error:", error);
            if (error.response) {
              console.log("Response data:", error.response.data);
              console.log("Response status:", error.response.status);
            }
          }          
    };
    fetchData();
  }, [id,accessToken]);

  if (!qrData) return <p>-------------</p>;

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">QR Code: {qrData.name}</h1>
      <img src={qrData.qrImage} alt="QR Code" className="mx-auto w-64 h-64" />
      <p className="mt-4">
        Original URL: <a href={qrData.originalUrl} className="text-blue-600 underline">{qrData.originalUrl}</a>
      </p>
    </div>
  );
};

export default QrCodeDetail;
