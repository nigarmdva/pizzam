import React from "react";
import { useState } from "react";
import useAuthStore from "../store/store";
import useCartStore from "../store/cart";
import { useNavigate } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";

const UserProfileNav = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const [details, setDetails] = useState(false);

  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row justify-between w-full px-4 sm:px-10 py-3 sm:py-5 items-start sm:items-center">
          <div>
            <h1>
              Salam, <span className="font-[600]">{user?.fullName}</span>
            </h1>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/user")}
            >
              <FaShoppingCart className="text-3xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>

            <span
              className="bg-[#000] text-white px-4 py-2 rounded my-4 cursor-pointer"
              onClick={() => setDetails(!details)}
            >
              İstifadəçi məlumatları
            </span>
            <button
              onClick={logout}
              className="bg-[#bbb] text-white px-4 py-2 cursor-pointer rounded my-4"
            >
              Çıxış
            </button>
          </div>
        </div>

        <hr />

        <div
          className={`transition-all duration-500 ease-in-out transform border border-gray-300 rounded-md p-4 mx-5 w-[350px] ${
            details
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <p>
            Email: <span className="font-[600]">{user?.email}</span>
          </p>
          <p>
            Ad soyad: <span className="font-[600]">{user?.fullName}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfileNav;
