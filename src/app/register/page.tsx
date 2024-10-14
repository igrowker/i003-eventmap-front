"use client";

import EventMapLogo from "@/../public/logo_eventmap.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateEmail, formatCuitCuil } from "@/utils/formUtils";

import { BsFillPersonFill } from "react-icons/bs";
import { BiSolidEnvelope } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

import { iconShowPassword } from "@/components/icons/IconShowPassword";
import { iconHidePassword } from "@/components/icons/IconHidePassword";

import { FormValues, Errors, FormFieldStates } from "@/types/register-types";
import toast, { Toaster } from "react-hot-toast";
import { setTimeout } from "timers/promises";

export default function Register() {

  const router = useRouter();

  const [togglePassword, setTogglePassword] = useState(true);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const API_URL = 'process.env.NEXT_PUBLIC_API_URL';

  const [fieldStates, setFieldStates] = useState<FormFieldStates>({
    firstName: { isFocused: false },
    lastName: { isFocused: false },
    email: { isFocused: false },
    password: { isFocused: false },
    confirmPassword: { isFocused: false },
    cuitCuil: { isFocused: false },
  });

  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    cuitCuil: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleFocusBlur = (
    field: keyof FormFieldStates,
    isFocused: boolean
  ) => {
    setFieldStates((prev) => ({
      ...prev,
      [field]: { isFocused },
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cuitCuil") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: formatCuitCuil(value),
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleError = () => {
    const newErrors: Errors = {};

    const { firstName, lastName, email, password, confirmPassword, cuitCuil } =
      formValues;

    if (!firstName.trim()) {
      newErrors.firstName = "El nombre es requerido";
    } else if (firstName.length < 1) {
      newErrors.firstName = "El nombre debe tener al menos 1 caracter";
    } else if (firstName.length > 50) {
      newErrors.firstName = "El nombre no puede exceder los 50 caracteres";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(firstName)) {
      newErrors.firstName = "El nombre solo puede contener letras";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    } else if (lastName.length < 3) {
      newErrors.lastName = "El apellido debe tener al menos 3 caracteres";
    } else if (lastName.length > 50) {
      newErrors.lastName = "El apellido no puede exceder los 50 caracteres";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(lastName)) {
      newErrors.lastName = "El apellido solo puede contener letras";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "El email es requerido";
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Email inválido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8 || password.length > 16) {
      newErrors.password = "La contraseña debe tener entre 8 y 16 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "La contraseña debe tener al menos una letra mayúscula";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "La contraseña debe tener al menos una letra minúscula";
    } else if (!/\d/.test(password)) {
      newErrors.password = "La contraseña debe tener al menos un número";
    } else if (!/[!@+#$%^&*()\[\]{}\-_,.]/.test(password)) {
      newErrors.password =
        "La contraseña debe tener al menos un carácter especial";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "La contraseña es requerida";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!cuitCuil.trim()) {
      newErrors.cuitCuil = "El CUIT/CUIL es requerido";
    } else if (cuitCuil.length === 11) {
      if (!/^\d{11}$/.test(cuitCuil)) {
        newErrors.cuitCuil = "CUIT/CUIL Inválido";
      }
    } else if (cuitCuil.length === 13) {
      if (!/^\d{2}-\d{8}-\d{1}$/.test(cuitCuil)) {
        newErrors.cuitCuil = "CUIT/CUIL Inválido";
      }
    } else {
      newErrors.cuitCuil = "CUIT/CUIL Inválido";
    }

    if (!termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const newErrors = handleError();
  
    if (Object.keys(newErrors).length === 0) {
      
      toast.promise(registerUser(), {
        loading: "Registrando usuario...",
        success: "Registro exitoso!",
        error: "Error al registrar",
      });
    }
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const trimmedFormValues = {
        name: formValues.firstName.trim(),
        lastName: formValues.lastName.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
        cuit: formValues.cuitCuil,
      };
  
      // Enviar datos al backend
      const req = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trimmedFormValues),
      });
      
      const res = await req.json();
      console.log(res);
  
      if (!req.ok) {
        throw new Error(res.message || "Error en el registro");
      }
      
      window.setTimeout(() => {
        router.push("/login");
      }, 1000);
  
    } catch (error) {
      
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-[#131a23]">
      <Toaster
        toastOptions={{
          duration: 1500,
          position: "top-center",
          className: "w-full",
          style: {
            background: "#e5dff7",
            color: "#6750A4",
            padding: "25px",
            fontWeight: "bold",
            fontSize: "17px",
          },
        }}
      />
      <div className="py-5 px-4">
        <Link href={"/login"}>
          <BiArrowBack className="mb-4" size={24} color="white" />
        </Link>

        <h1 className="font-bold text-2xl text-white">
          Nuevo usuario EventMap
        </h1>
        <div className="flex flex-col items-center gap-4 py-6">
          <Image
            className=""
            width={120}
            height={120}
            src={EventMapLogo}
            alt="Logo EventMap"
          />
        </div>
      </div>

      {/* REGISTER FORM */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white px-4 py-4 rounded-t-3xl"
      >
        <div className="flex justify-center items-center gap-2 py-3">
          <p className="font-bold">Registro sólo para organizadores</p>
        </div>
        <div className="flex gap-3">
          {/* NAME */}
          <div className="relative flex flex-col w-full">
            <label
              className={`${
                errors.firstName && !fieldStates.firstName.isFocused
                  ? "text-[#cc5555]"
                  : fieldStates.firstName.isFocused
                  ? "text-[#6750a4]"
                  : "text-[#8A8D8E]"
              } absolute z-30  left-2.5 -top-2 text-xs font-bold bg-white px-1`}
            >
              Nombre
            </label>
            <div className="relative flex items-center">
              <BsFillPersonFill
                color="#5C5F5F"
                className="absolute left-3"
                size={24}
              />
              <input
                name="firstName"
                placeholder="Nombre"
                className={`${
                  errors.firstName
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-10 rounded-full border-2 w-full`}
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                onFocus={() => handleFocusBlur("firstName", true)}
                onBlur={() => handleFocusBlur("firstName", false)}
              />
            </div>
            {errors.firstName && (
              <p className="text-[#cc5555] text-sm pt-1 text-end">
                {errors.firstName}
              </p>
            )}
          </div>

          {/* LAST NAME */}
          <div className="relative flex flex-col w-full">
            <label
              className={`${
                errors.lastName && !fieldStates.lastName.isFocused
                  ? "text-[#cc5555]"
                  : fieldStates.lastName.isFocused
                  ? "text-[#6750a4]"
                  : "text-[#8A8D8E]"
              } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
            >
              Apellido
            </label>
            <div className="relative flex items-center">
              <BsFillPersonFill
                color="#5C5F5F"
                className="absolute left-3"
                size={24}
              />
              <input
                name="lastName"
                placeholder="Apellido"
                className={`${
                  errors.lastName
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-10 rounded-full border-2 w-full`}
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                onFocus={() => handleFocusBlur("lastName", true)}
                onBlur={() => handleFocusBlur("lastName", false)}
              />
            </div>
            {errors.lastName && (
              <p className="text-[#cc5555] text-sm pt-1 text-end">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.email && !fieldStates.email.isFocused
                ? "text-[#cc5555]"
                : fieldStates.email.isFocused
                ? "text-[#6750a4]"
                : "text-[#8A8D8E]"
            } absolute z-30  left-2.5 -top-2 text-xs font-bold bg-white px-1`}
          >
            Correo
          </label>
          <div className="relative flex items-center">
            <BiSolidEnvelope
              className="absolute left-3"
              size={24}
              color="#5C5F5F"
            />
            <input
              name="email"
              placeholder="correo@email.com"
              className={`${
                errors.email ? "border-[#cc5555] border-2" : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-10 rounded-full border-2 w-full`}
              type="text"
              value={formValues.email}
              onChange={handleChange}
              onFocus={() => handleFocusBlur("email", true)}
              onBlur={() => handleFocusBlur("email", false)}
            />
          </div>
          {errors.email && (
            <p className="text-[#cc5555] text-sm pt-1 text-end">
              {errors.email}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.password && !fieldStates.password.isFocused
                ? "text-[#cc5555]"
                : fieldStates.password.isFocused
                ? "text-[#6750a4]"
                : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
          >
            Contraseña
          </label>
          <div className="relative flex items-center">
            {togglePassword
              ? iconShowPassword(() => setTogglePassword((prev) => !prev))
              : iconHidePassword(() => setTogglePassword((prev) => !prev))}
            <input
              name="password"
              placeholder="Contraseña"
              className={`${
                errors.password
                  ? "border-[#cc5555] border-2"
                  : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
              type={togglePassword ? "password" : "text"}
              value={formValues.password}
              onChange={handleChange}
              onFocus={() => handleFocusBlur("password", true)}
              onBlur={() => handleFocusBlur("password", false)}
            />
          </div>
          {errors.password && (
            <p className="text-[#cc5555] text-sm pt-1 text-end">
              {errors.password}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.confirmPassword && !fieldStates.confirmPassword.isFocused
                ? "text-[#cc5555]"
                : fieldStates.confirmPassword.isFocused
                ? "text-[#6750a4]"
                : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
          >
            Confirmar Contraseña
          </label>
          <div className="relative flex items-center">
            {toggleConfirmPassword
              ? iconShowPassword(() =>
                  setToggleConfirmPassword((prev) => !prev)
                )
              : iconHidePassword(() =>
                  setToggleConfirmPassword((prev) => !prev)
                )}
            <input
              name="confirmPassword"
              placeholder="Repetir contraseña"
              className={`${
                errors.confirmPassword
                  ? "border-[#cc5555] border-2"
                  : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
              type={toggleConfirmPassword ? "password" : "text"}
              value={formValues.confirmPassword}
              onChange={handleChange}
              onFocus={() => handleFocusBlur("confirmPassword", true)}
              onBlur={() => handleFocusBlur("confirmPassword", false)}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[#cc5555] text-sm pt-1 text-end">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* CUIT/CUIL */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.cuitCuil && !fieldStates.cuitCuil.isFocused
                ? "text-[#cc5555]"
                : fieldStates.cuitCuil.isFocused
                ? "text-[#6750a4]"
                : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
          >
            CUIT/CUIL
          </label>
          <div className="relative flex items-center">
            <input
              name="cuitCuil"
              placeholder="XX-XXXXXXXX-X"
              maxLength={13}
              className={`${
                errors.cuitCuil
                  ? "border-[#cc5555] border-2"
                  : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
              type="text"
              value={formValues.cuitCuil}
              onChange={handleChange}
              onFocus={() => handleFocusBlur("cuitCuil", true)}
              onBlur={() => handleFocusBlur("cuitCuil", false)}
            />
          </div>
          {errors.cuitCuil && (
            <p className="text-[#cc5555] text-sm pt-1 text-end">
              {errors.cuitCuil}
            </p>
          )}
        </div>

        {/* TERMS AND CONDITIONS */}
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

        {/* SPINNER AND CREATE ACCOUNT BUTTON */}
        <button
          
          className={`${loading ? 'opacity-50 cursor-none' : ''} bg-[#6750A4] text-white text-lg p-2 py-2.5 w-full rounded-full mb-14`}
          type="submit"
        >
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}
