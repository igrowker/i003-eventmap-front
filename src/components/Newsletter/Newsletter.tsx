import React, { FormEvent, useCallback, useState } from "react";
import { BiCalendarHeart, BiSolidEnvelope } from "react-icons/bi";
import CustomModal from "../modals/modalPostEvent/CustomModal";
import { FaCircleCheck } from "react-icons/fa6";

const intialInputEmail = {
  email: ""
};

const Newsletter = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState(intialInputEmail);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    setEmail({
      email: e.target.value,
    });
  };

  const onClosed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowModal(false)
  }

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const postSubscribe = async () => {
        try {
          const req = await fetch(
            `${API_URL}/restore-password/subscribe`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(email),
            }
          );
          // const response = await req.json();
          if (req.ok) {
            setShowModal(true);
            setEmail(intialInputEmail);
            setLoading(false);
          };
          
        } catch (error) {
          console.error("Error al enviar los datos", error);          
        }
      }

      postSubscribe();

    },[email]
  )

  return (
    loading ? (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center transition-opacity duration-300">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-current" />
    </div>
    ) :
    <div>
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
            type="email"
            name="email"
            value={email.email}
            onChange={handleInputChange}
            placeholder="Correo"
            className="rounded-full w-full py-3 px-4 pr-16 border border-gray-500 pl-10"
          />
          <button
          onClick={handleSubmit}
          className="absolute rounded-full right-2 top-1/2 transform -translate-y-1/2 bg-createEventButton text-white py-1 px-3"
          >
            Suscribir
          </button>
        </div>
      </div>
      {showModal && (
        <CustomModal onClose={() => {}} isOpen={() => {}}>
        <div className="z-50 bg-white w-full mx-6 flex flex-col items-center gap-2 p-4 shadow-lg rounded-2xl">
            <div className="relative">
              <BiCalendarHeart className="size-28" />
              <FaCircleCheck className="absolute bottom-0 right-0 size-12 bg-white rounded-full p-0.5 text-[#07AEAF]" />
            </div>
            <p className="text-lg font-semibold">¡Gracias por suscribirte!</p>
            <button
            className="mt-8 w-full text-center mx-6 bg-createEventButton text-white rounded-full px-4 py-2"
            onClick={onClosed}
            >
            Hecho
            </button>
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default Newsletter;
