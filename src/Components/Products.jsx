import React, { useState } from "react";
import data from "../api/papajohns.json";
import Modal from "./Modal";

const Products = () => {
  const [selectedPizza, setSelectedPizza] = useState(null);

  const openModal = (item) => {
    setSelectedPizza(item);
  };

  const closeModal = () => {
    setSelectedPizza(null);
  };

  return (
    <div>
        <h1 className="px-10 text-center text-[2rem] font-[500]">Pizzalarımız</h1>
      <div className="px-10 py-5">
        {selectedPizza && (
          <Modal pizza={selectedPizza} closeModal={closeModal} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.pizza.map((item) => (
            <div
              key={item.id}
              className="group relative border cursor-pointer px-4 pb-10 h-[400px] rounded-lg hover:shadow-lg"
              onClick={() => openModal(item)}
            >
              <img
                src={`../img/${item.img}`}
                alt={item.name}
                className="w-full h-auto rounded-lg mt-4"
              />
              <div className="py-2 px-3">
                <h3 className="text-l font-semibold">{item.name}</h3>
                <div className="h-[50px]">
                  <p className="text-gray-500 text-[1rem] line-clamp-2">
                    {item.des}
                  </p>
                </div>
                {Object.keys(item.prices)
                  .sort((a, b) => b.localeCompare(a))
                  .slice(0, 1)
                  .map((size) => (
                    <p key={size} className="text-lg font-medium">
                      {item.prices[size]} AZN-dən
                    </p>
                  ))}
              </div>
              <div className="flex items-center justify-center">
                <a className="hidden group-hover:flex absolute bottom-2 bg-[var(--green)] text-black w-[85%] px-3 py-1 border rounded-full cursor-pointer hover:border-[#000] hover:bg-white hover:text-black transition duration-300 justify-center text-sm">
                  Səbətə əlavə et
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
