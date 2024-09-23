"use client";

import EventMapLogo from "@/../public/isotipo.webp";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validateEmail } from "@/utils/formUtils";

interface FormValues {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function Login() {
   
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleError = () => {
    const newErrors: Errors = {};
    
    const trimmedEmail = formValues.email.trim();
    
    if (!trimmedEmail) newErrors.email = "El email es requerido";
    else if (!validateEmail(trimmedEmail)) newErrors.email = "Email inválido";

    if (!formValues.password) newErrors.password = "La contraseña es requerida";

    setErrors(newErrors);
    return newErrors;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const newErrors = handleError();
    
    if (Object.keys(newErrors).length === 0) {
      
      //Enviar datos al backend
      
    }
  };

  return (
    <div className="py-5 px-4">
      <Link href={'#'}>
        <svg
          className="mb-4"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.9999 7.00008V9.00008H3.99991L9.49991 14.5001L8.07991 15.9201L0.159912 8.00008L8.07991 0.0800781L9.49991 1.50008L3.99991 7.00008H15.9999Z"
            fill="black"
          />
        </svg>
      </Link>

      <h1 className="font-bold text-2xl">Iniciar sesión</h1>
      <div className="flex flex-col items-center gap-4 py-6">
        <Image
          className=""
          width={140}
          height={140}
          src={EventMapLogo}
          alt="Logo EventMap"
        />
        <p className="font-bold text-center">Ingreso sólo para organizadores</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4">
          <input
            name="email"
            placeholder="Mail"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="text"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            name="password"
            placeholder="Contraseña"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="bg-[#989898] p-3 rounded-lg text-white font-bold mt-8"
        >
          Ingresar
        </button>
        <Link className="self-center my-3" href={"/register"}>
          <button type="button">Crear cuenta</button>
        </Link>
      </form>
    </div>
  );
}
