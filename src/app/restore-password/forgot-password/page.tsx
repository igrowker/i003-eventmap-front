"use client";

import { BiArrowBack } from "react-icons/bi";
import { BiSolidEnvelope } from "react-icons/bi";
import Link from "next/link";
import { useState, useEffect } from "react";
import { validateEmail } from "@/utils/formUtils";

function ForgotPassword() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [isFocused, setIsFocused] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [isCounting, setIsCounting] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ email: "" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrors({ email: "Correo electrónico no válido" });
    } else {  
      setLoading(true);
      const trimmedEmail = email.trim();
      
      try {
        const req = await fetch(`${API_URL}/restore-password/forgot-password`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: trimmedEmail }),
          }
        );
        const res = await req.json();
        if (req.ok) {
          setLoading(false);
          setEmailSended(true);
          setSentEmail(trimmedEmail);
          setIsCounting(true); 
          setCountdown(120);
        } else {
          setErrors({ email: "El email ingresado no posee cuenta activa" });
          console.error("Error en la respuesta:", res);
          throw new Error("Falló el envío de la solicitud");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    }
  };

  const handleResendEmail = () => {
    setCountdown(120); 
    setIsCounting(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCounting) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsCounting(false); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCounting]);

  return (
    <div className="px-4 my-5 w-screen h-screen">
      <Link href={"/"}>
        <BiArrowBack className="mb-4" size={24} color="black" />
      </Link>
      <h1 className="font-bold text-xl">Olvidé mi contraseña</h1>
      <p className="py-12 text-sm text-[#5C5F5F]">
        Recibirás un mail con los pasos para restablecer tu contraseña.
      </p>
      <form onSubmit={handleSubmit}>
        
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.email && !isFocused
                ? "text-[#cc5555]"
                : isFocused
                ? "text-[#6750a4]"
                : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
          >
            Correo
          </label>

          <div className="relative flex items-center">
            <BiSolidEnvelope
              size={24}
              color="#5C5F5F"
              className="absolute left-3"
            />
            <input
              name="email"
              placeholder="correo@email.com"
              className={`${
                errors.email
                  ? "border-[#cc5555] border-2"
                  : "border-[#8A8D8E] border-2"
              } placeholder-textPlaceholder focus-visible:outline-[#6750a4] placeholder:font-normal pl-10 p-2 rounded-full w-full`}
              type="text"
              value={email}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>

          {errors.email && (
            <p className="text-[#cc5555] text-sm pt-1 text-end">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-[#6750a4] text-white py-2.5 rounded-full w-full"
          disabled={isCounting}
        >
          Enviar
        </button>

        {emailSended && (
          <div className="py-4">
            <p className="text-center text-[#5C5F5F] text-sm">
              Se ha enviado un correo a la casilla {sentEmail}
            </p>
            <div className="flex flex-col items-center py-4">
              <p className="text-center text-[#5C5F5F] text-sm">¿No lo has recibido?</p>
              <p className="text-center text-[#5C5F5F] text-sm">
                {Math.floor(countdown / 60)}:
                {String(countdown % 60).padStart(2, '0')}
              </p>
              <button
                className={`${isCounting ? "opacity-40" : ""} text-sm text-[#5C5F5F] underline`}
                onClick={handleResendEmail}
                disabled={isCounting}
              >
                Enviar nuevamente
              </button>
            </div>
          </div>
        )}
      </form>
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-white" />
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
