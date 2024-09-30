import React from "react";

function Newsletter() {
  return (
    <div className=" w-full bg-[#E9E9E9] rounded-xl p-4 flex flex-col gap-2">
      <h1 className="font-bold text-lg">Suscribite</h1>
      <p>Recibi noticias de las zonas de mayor demanda en tiempo real</p>
      <div className="relative">
        <input
          type="text"
          placeholder="Mail"
          className="rounded-full w-full py-3 px-4 pr-16 border border-gray-500 "
        />
        <button className="absolute rounded-full right-2 top-1/2 transform -translate-y-1/2 bg-[#6C6B6B] text-white py-1 px-3">
          Suscribir
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
