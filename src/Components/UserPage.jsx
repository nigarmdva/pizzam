import React from "react";
import useCartStore from "../store/cart";
import CartPage from "./CartPage";
import { FaArrowLeftLong } from "react-icons/fa6";

import Home from "./Home";
import UserProfileNav from "./UserProfileNav";

const UserPage = () => {
  const cart = useCartStore((state) => state.cart);
  console.log(cart);
  return (
    <div>
      <UserProfileNav />

      {cart.length === 0 ? (
        <Home />
      ) : (
        <>
          <div className="px-10 flex flex-row text-gray-600 hover:text-[var(--darkGreen)] transition duration-300">
            <a
              href="/products"
              className="flex items-center gap-2 text-l font-medium"
            >
              <FaArrowLeftLong />
              <span>Pizzalar</span>
            </a>
          </div>
          <CartPage />
        </>
      )}
    </div>
  );
};

export default UserPage;
