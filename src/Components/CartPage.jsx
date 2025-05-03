import React from "react";
import useCartStore from "../store/cart";
import { MdDelete } from "react-icons/md";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="px-10 py-6">
      <h2 className="text-2xl font-semibold mb-6">Sizin Səbətiniz</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.map((item, id) => (
          <div
            key={id}
            className="group relative border cursor-pointer px-4 pb-10 h-[400px] rounded-lg hover:shadow-lg"
          >
            <MdDelete
              className="absolute top-3 right-3 text-red-500 text-3xl opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer hover:text-red-700"
              onClick={() => removeFromCart(item.id)}
            />

            <img
              src={`../img/${item.img}`}
              alt={item.name}
              className="w-full h-auto rounded-lg mt-4"
            />
            <div className="py-2 px-3">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-lg font-medium">
                <span className="text-gray-500">Ümumi:</span>
                <span className="text-[var(--darkGreen)]"> {item.total} AZN</span>
              </p>
            </div>

            <div className="flex items-center gap-[5px] px-5 absolute bottom-4 right-4">
              <button
                onClick={() => decreaseQuantity(item.id, item.size)}
                className="px-3 py-1 border border-[var(--darkGreen)] text-[var(--darkGreen)] hover:bg-[var(--darkGreen)] hover:text-white cursor-pointer transition duration-300 rounded-full"
              >
                -
              </button>
              <div className="bg-[var(--green)] text-black px-4 py-2 rounded-full">
                {item.quantity} ədəd
              </div>
              <button
                onClick={() => increaseQuantity(item.id, item.size)}
                className="px-3 py-1 border border-[var(--darkGreen)] text-[var(--darkGreen)] hover:bg-[var(--darkGreen)] hover:text-white cursor-pointer transition duration-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
