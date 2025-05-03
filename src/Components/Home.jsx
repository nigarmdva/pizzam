import React from "react";
import useAuthStore from "../store/store";

const Home = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4 text-center">
        {isAuth ? `${user.fullName}, xoş gəldin!` : "Pizzam-a xoş gəlmisiniz!"}
      </h1>

      <p className="text-center mb-4 max-w-xl">
        Ən sevdiyin pizzanı buradan seç! İsti, dadlı və bol çeşidli pizzalar bir
        toxunuşla qapında.
      </p>

      <a
        href={isAuth ? "/products" : "/register"}
        className="bg-[#000] text-white px-4 py-2 rounded mt-4"
      >
        {isAuth ? "Sifarişə başla" : "Qeydiyyatdan keç"}
      </a>
    </div>
  );
};

export default Home;
