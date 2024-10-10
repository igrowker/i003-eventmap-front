import React from "react";
import { BiSolidEnvelope } from "react-icons/bi";

function Newsletter() {
  return (
    <div className=" w-full rounded-xl p-4 flex flex-col gap-2 shadow-[1px_1px_3px_2px_rgba(0,0,0,0.2)]">
      <h1 className="font-bold text-lg text-[#6750A4]">Suscribite</h1>
      <p>Recibí noticias de las zonas de mayor demanda en tiempo real</p>
      <div className="relative flex items-center">
        <BiSolidEnvelope
          size={24}
          color="#5C5F5F"
          className="absolute left-3"
        />
        <input
          type="text"
          placeholder="Correo"
          className="rounded-full w-full py-3 px-4 pr-16 border border-gray-500 pl-10"
        />
        <button className="absolute rounded-full right-2 top-1/2 transform -translate-y-1/2 bg-createEventButton text-white py-1 px-3">
          Suscribir
        </button>
      </div>
    </div>
  );
}

export default Newsletter;
