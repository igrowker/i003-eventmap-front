"use client";

import EventMapLogo from "@/../public/isotipo.webp";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validateEmail } from "@/utils/formUtils";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  cuitCuil: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cuitCuil?: string;
  termsAccepted?: string;
}

export default function Register() {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cuitCuil: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleError = () => {
    const newErrors: Errors = {};

    const { firstName, lastName, email, password, confirmPassword, cuitCuil } =
      formValues;

    if (!firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    } else if (firstName.length < 3) {
      newErrors.firstName = "El nombre debe tener al menos 3 caracteres";
    } else if (firstName.length > 50) {
      newErrors.firstName = "El nombre no puede exceder los 50 caracteres";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    } else if (lastName.length < 3) {
      newErrors.lastName = "El apellido debe tener al menos 3 caracteres";
    } else if (lastName.length > 50) {
      newErrors.lastName = "El apellido no puede exceder los 50 caracteres";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "El email es requerido";
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Email inválido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    } else if (password.length > 50) {
      newErrors.password = "La contraseña no puede exceder los 50 caracteres";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "La contraseña es requerida";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!cuitCuil.trim()) {
      newErrors.cuitCuil = "El CUIT/CUIL es requerido";
    } else if (cuitCuil.length !== 11) {
      newErrors.cuitCuil = "CUIT/CUIL Inválido";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = handleError();

    if (Object.keys(newErrors).length === 0) {
      const trimmedFormValues = {
        firstName: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        cuitCuil: formValues.cuitCuil.trim(),
      };

      //Enviar datos al backend
    }
  };

  return (
    <div className="py-5 px-4">
      <Link href={"#"}>
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

      <h1 className="font-bold text-2xl">Nuevo usuario EventMap</h1>
      <div className="flex flex-col items-center gap-4 py-6">
        <Image
          className=""
          width={140}
          height={140}
          src={EventMapLogo}
          alt="Logo EventMap"
        />
        <div className="flex items-center gap-2">
          <svg
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.98611 3.51389C1.98611 1.57322 3.55933 0 5.5 0C7.44067 0 9.01389 1.57322 9.01389 3.51389V4.19449C9.01389 4.23532 9.00855 4.2749 8.99854 4.31257C9.87615 4.63505 10.5602 5.34306 10.8505 6.23634C11 6.6966 11 7.26533 11 8.40278C11 9.54023 11 10.109 10.8505 10.5692C10.5482 11.4994 9.81889 12.2288 8.88866 12.531C8.4284 12.6806 7.85966 12.6806 6.72222 12.6806H4.27776C3.14032 12.6806 2.5716 12.6806 2.11134 12.531C1.18111 12.2288 0.451799 11.4994 0.14955 10.5692C0 10.109 0 9.54023 0 8.40278C0 7.26533 0 6.6966 0.14955 6.23634C0.439794 5.34306 1.12385 4.63505 2.00146 4.31257C1.99145 4.2749 1.98611 4.23532 1.98611 4.19449V3.51389ZM2.90278 4.14586C3.25095 4.125 3.68788 4.125 4.27778 4.125H6.72222C7.31212 4.125 7.74905 4.125 8.09722 4.14586V3.51389C8.09722 2.07948 6.93441 0.916667 5.5 0.916667C4.06559 0.916667 2.90278 2.07948 2.90278 3.51389V4.14586ZM5.5 6.72222C5.75313 6.72222 5.95833 6.92743 5.95833 7.18056V9.625C5.95833 9.87813 5.75313 10.0833 5.5 10.0833C5.24687 10.0833 5.04167 9.87813 5.04167 9.625V7.18056C5.04167 6.92743 5.24687 6.72222 5.5 6.72222Z"
              fill="#413C3C"
            />
          </svg>
          <p className="font-bold">Registro sólo para organizadores</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-full">
            <input
              name="firstName"
              placeholder="Nombre"
              className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
              type="text"
              value={formValues.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="w-full">
            <input
              name="lastName"
              placeholder="Apellido"
              className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
              type="text"
              value={formValues.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <input
            name="email"
            placeholder="Mail"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="text"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <input
            name="password"
            placeholder="Contraseña"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <input
            name="confirmPassword"
            placeholder="Repetir contraseña"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <input
            name="cuitCuil"
            placeholder="CUIT/CUIL"
            className="placeholder-gray-700 p-2 rounded-lg border border-black w-full"
            type="number"
            value={formValues.cuitCuil}
            onChange={handleChange}
          />
          {errors.cuitCuil && (
            <p className="text-red-500 text-sm">{errors.cuitCuil}</p>
          )}
        </div>
        <div>
          <label className="flex justify-center gap-2" htmlFor="termsAccepted">
            <input
              name="termsAccepted"
              type="checkbox"
              checked={termsAccepted}
              onChange={handleCheckboxChange}
            />
            <p>
              Aceptar <span className="font-bold">Términos y condiciones</span>
            </p>
          </label>
          {errors.termsAccepted && (
            <p className="text-red-500 text-center text-sm">
              {errors.termsAccepted}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-[#989898] p-3 rounded-lg text-white font-bold my-3"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}
