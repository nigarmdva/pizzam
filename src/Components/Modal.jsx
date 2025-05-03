import React, { useState } from "react";
import useCartStore from "../store/cart";

const Modal = ({ pizza, closeModal }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [count, setCount] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const selectedPrice = selectedSize ? pizza.prices[selectedSize] : null;
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowAlert(true);
      return;
    }
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      size: selectedSize,
      quantity: count,
      price: selectedPrice,
      total: selectedPrice * count,
      img: pizza.img,
    };

    addToCart(cartItem);
    closeModal();
    setSelectedSize("");
    setCount(1);
    setShowAlert(false); 
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setShowAlert(false);
  };

  return (
    <div className="fixed inset-0 g-black bg-opacity-10 backdrop-blur-sm z-40 flex justify-center items-center z-50">
      <div className="bg-[#F6F6F6] w-[70%] p-6 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <button
            onClick={() => {
              closeModal();
              setSelectedSize(""); // Reset on close
              setCount(1); // Reset on close
            }}
            className="text-gray-400 cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className="flex flex-row">
          <div className="p-4 space-y-4">
            <div>
              <img src={`../img/${pizza.img}`} alt="" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {pizza.name}
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                {pizza.des}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[1.2rem] font-[700] mb-2">
              Ölçü
              <span className="text-[var(--darkGreen)]">(Mütləq)</span>
            </p>
            <div className="space-y-2">
              {Object.keys(pizza.prices).map((size) => (
                <div
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`flex justify-between items-center cursor-pointer px-4 py-2 rounded-md shadow-sm border ${
                    selectedSize === size
                      ? "bg-[var(--darkGreen)] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-all duration-200`}
                >
                  <p className="font-medium">{size.toUpperCase()}</p>
                  <span className="font-[700]">{pizza.prices[size]} AZN</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAlert && (
          <p className="text-red-600 p-2 text-xl">Zəhmət olmasa ölçü seçin!</p>
        )}

        <div className="flex flex-row items-center justify-end gap-[10px]">
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-semibold">
              <span className="text-[var(--darkGreen)]">
                {selectedPrice ? `${selectedPrice * count} AZN` : "AZN"}
              </span>
            </div>
            <div className="flex items-center px-5">
              <button
                onClick={() => count > 1 && setCount(count - 1)}
                className="px-3 py-1 border border-[var(--darkGreen)] text-[var(--darkGreen)] hover:bg-[var(--darkGreen)] hover:text-white cursor-pointer transition duration-300 rounded-full"
              >
                -
              </button>
              <span className="font-medium px-3">{count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="px-3 py-1 border border-[var(--darkGreen)] text-[var(--darkGreen)] hover:bg-[var(--darkGreen)] hover:text-white cursor-pointer transition duration-300 rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddToCart}
              className="flex w-[200px] bg-[var(--green)] text-black px-3 py-5 border rounded-full uppercase cursor-pointer hover:border-[#000] hover:bg-white hover:text-black transition duration-300 justify-center text-sm"
            >
              Səbətə əlavə et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
