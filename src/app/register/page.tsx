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
  const [togglePassword, setTogglePassword] = useState(true);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(firstName)) {
      newErrors.firstName = "El nombre no puede contener numeros";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "El apellido es requerido";
    } else if (lastName.length < 3) {
      newErrors.lastName = "El apellido debe tener al menos 3 caracteres";
    } else if (lastName.length > 50) {
      newErrors.lastName = "El apellido no puede exceder los 50 caracteres";
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(lastName)) {
      newErrors.lastName = "El apellido no puede contener numeros";
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = "El email es requerido";
    } else if (!validateEmail(trimmedEmail)) {
      newErrors.email = "Email inválido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8 || password.length > 20) {
      newErrors.password = "La contraseña debe tener entre 8 y 20 caracteres";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "La contraseña debe tener al menos una letra mayúscula";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "La contraseña debe tener al menos una letra minúscula";
    } else if (!/\d/.test(password)) {
      newErrors.password = "La contraseña debe tener al menos un número";
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
      setLoading(true);
      try {
        const trimmedFormValues = {
          name: formValues.firstName.trim(),
          lastName: formValues.lastName.trim(),
          email: formValues.email.trim(),
          password: formValues.password,
          cuit: formValues.cuitCuil.trim(),
        };

        //Enviar datos al backend
        const req = await fetch(
          "https://i003-eventmap-back.onrender.com/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmedFormValues),
          }
        );
        const res = await req.json();
        console.log(res);
      } catch (error) {
        console.error("Error al enviar los dato", error);
      } finally {
        setLoading(false);
        setShowModal(true);
      }
    }
  };

  const iconShowPassword = (toggleFunction: () => void) => {
    return (
      <svg
        onClick={toggleFunction}
        className="absolute right-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.0832 11.3953C21.2593 9.65947 20.2788 8.24385 19.1418 7.14838L17.9493 8.34088C18.9217 9.27018 19.7687 10.4859 20.5012 11.9999C18.5512 16.0359 15.7832 17.9531 12.0004 17.9531C10.8649 17.9531 9.81905 17.7782 8.8628 17.4285L7.57069 18.7206C8.89882 19.3339 10.3754 19.6406 12.0004 19.6406C16.5051 19.6406 19.866 17.2945 22.0832 12.6023C22.1723 12.4136 22.2186 12.2075 22.2186 11.9988C22.2186 11.7901 22.1723 11.584 22.0832 11.3953ZM20.5933 3.88025L19.5941 2.87994C19.5767 2.86251 19.556 2.84868 19.5333 2.83924C19.5105 2.82981 19.4861 2.82495 19.4615 2.82495C19.4368 2.82495 19.4124 2.82981 19.3897 2.83924C19.3669 2.84868 19.3462 2.86251 19.3288 2.87994L16.7655 5.44213C15.3522 4.72025 13.7638 4.35932 12.0004 4.35932C7.49569 4.35932 4.13475 6.70541 1.91757 11.3976C1.82845 11.5863 1.78223 11.7924 1.78223 12.0011C1.78223 12.2098 1.82845 12.4159 1.91757 12.6046C2.80335 14.4703 3.86975 15.9656 5.11679 17.0908L2.63663 19.5703C2.60149 19.6054 2.58176 19.6531 2.58176 19.7028C2.58176 19.7525 2.60149 19.8002 2.63663 19.8353L3.63718 20.8359C3.67234 20.871 3.72001 20.8908 3.76972 20.8908C3.81942 20.8908 3.86709 20.871 3.90225 20.8359L20.5933 4.14557C20.6107 4.12815 20.6245 4.10747 20.634 4.08471C20.6434 4.06195 20.6483 4.03755 20.6483 4.01291C20.6483 3.98827 20.6434 3.96387 20.634 3.94111C20.6245 3.91835 20.6107 3.89767 20.5933 3.88025ZM3.4996 11.9999C5.45194 7.96401 8.21991 6.04682 12.0004 6.04682C13.2787 6.04682 14.4409 6.26619 15.4954 6.71221L13.8477 8.35986C13.0674 7.94353 12.174 7.78901 11.2991 7.91911C10.4243 8.04921 9.6145 8.45704 8.98911 9.08242C8.36372 9.70781 7.9559 10.5176 7.8258 11.3925C7.6957 12.2673 7.85022 13.1607 8.26655 13.941L6.31139 15.8962C5.22929 14.9411 4.29647 13.6471 3.4996 11.9999ZM9.28163 11.9999C9.28204 11.5867 9.37993 11.1793 9.56736 10.811C9.75478 10.4426 10.0265 10.1237 10.3603 9.88004C10.6941 9.63642 11.0807 9.47498 11.4887 9.40884C11.8967 9.3427 12.3145 9.37372 12.7082 9.4994L9.40608 12.8015C9.32332 12.5424 9.28133 12.272 9.28163 11.9999Z"
          fill="#5C5F5F"
        />
        <path
          d="M11.9059 14.6251C11.8248 14.6251 11.7449 14.6213 11.6657 14.614L10.4277 15.852C11.1723 16.1372 11.9836 16.2005 12.7634 16.0345C13.5432 15.8684 14.2583 15.48 14.8221 14.9162C15.3858 14.3524 15.7743 13.6373 15.9403 12.8575C16.1064 12.0777 16.043 11.2664 15.7579 10.5219L14.5199 11.7598C14.5272 11.839 14.5309 11.919 14.5309 12.0001C14.5311 12.3448 14.4634 12.6863 14.3315 13.0048C14.1996 13.3234 14.0063 13.6128 13.7625 13.8566C13.5187 14.1004 13.2293 14.2938 12.9107 14.4256C12.5921 14.5575 12.2507 14.6252 11.9059 14.6251Z"
          fill="black"
        />
      </svg>
    );
  };

  const iconHidePassword = (toggleFunction: () => void) => {
    return (
      <svg
        onClick={toggleFunction}
        className="absolute right-3"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.0832 11.3953C19.8613 6.71484 16.5027 4.35938 12.0004 4.35938C7.49569 4.35938 4.13944 6.71484 1.91757 11.3977C1.82845 11.5864 1.78223 11.7925 1.78223 12.0012C1.78223 12.2099 1.82845 12.416 1.91757 12.6047C4.13944 17.2852 7.49804 19.6406 12.0004 19.6406C16.5051 19.6406 19.8613 17.2852 22.0832 12.6023C22.2637 12.2227 22.2637 11.782 22.0832 11.3953ZM12.0004 17.9531C8.21991 17.9531 5.45194 16.0359 3.4996 12C5.45194 7.96406 8.21991 6.04688 12.0004 6.04688C15.7808 6.04688 18.5488 7.96406 20.5012 12C18.5512 16.0359 15.7832 17.9531 12.0004 17.9531ZM11.9066 7.875C9.6285 7.875 7.78163 9.72188 7.78163 12C7.78163 14.2781 9.6285 16.125 11.9066 16.125C14.1848 16.125 16.0316 14.2781 16.0316 12C16.0316 9.72188 14.1848 7.875 11.9066 7.875ZM11.9066 14.625C10.4558 14.625 9.28163 13.4508 9.28163 12C9.28163 10.5492 10.4558 9.375 11.9066 9.375C13.3574 9.375 14.5316 10.5492 14.5316 12C14.5316 13.4508 13.3574 14.625 11.9066 14.625Z"
          fill="#5C5F5F"
        />
      </svg>
    );
  };

  return (
    <div className="bg-[#131a23]">
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
              fill="white"
            />
          </svg>
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 bg-white px-4 py-4 rounded-t-3xl"
      >
        <div className="flex justify-center items-center gap-2 py-3">
          <p className="font-bold ">Registro sólo para organizadores</p>
        </div>
        <div className="flex gap-3">
          
          {/* NAME */}
          <div className="relative flex flex-col w-full">
            <label
              className={`${
                errors.firstName ? "text-[#cc5555]" : "text-[#8A8D8E]"
              } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
            >
              Nombre
            </label>
            <div className="relative flex items-center">
              <svg
                className="absolute right-3"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z"
                  fill="#5C5F5F"
                />
              </svg>

              <input
                name="firstName"
                placeholder="Nombre"
                className={`${
                  errors.firstName
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
              />
            </div>
            {errors.firstName && (
              <p className="text-[#cc5555] text-sm pl-3">{errors.firstName}</p>
            )}
          </div>

          {/* LAST NAME */}
          <div className="relative flex flex-col w-full">
            <label
              className={`${
                errors.lastName ? "text-[#cc5555]" : "text-[#8A8D8E]"
              } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
            >
              Apellido
            </label>
            <div className="relative flex items-center">
              <svg
                className="absolute right-3"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 18C1.5 18 0 18 0 16.5C0 15 1.5 10.5 9 10.5C16.5 10.5 18 15 18 16.5C18 18 16.5 18 16.5 18H1.5ZM9 9C10.1935 9 11.3381 8.52589 12.182 7.68198C13.0259 6.83807 13.5 5.69347 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5 5.69347 4.97411 6.83807 5.81802 7.68198C6.66193 8.52589 7.80653 9 9 9Z"
                  fill="#5C5F5F"
                />
              </svg>
              <input
                name="lastName"
                placeholder="Apellido"
                className={`${
                  errors.lastName
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
              />
            </div>
            {errors.lastName && (
              <p className="text-[#cc5555] text-sm pl-3">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* EMAIL */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.email ? "text-[#cc5555]" : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
          >
            Correo
          </label>
          <div className="relative flex items-center">
            <svg
              className="absolute right-3"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H18C18.5304 16 19.0391 15.7893 19.4142 15.4142C19.7893 15.0391 20 14.5304 20 14V2C20 1.46957 19.7893 0.960859 19.4142 0.585786C19.0391 0.210714 18.5304 0 18 0ZM18 4.7L10 10.034L2 4.7V2.297L10 7.63L18 2.297V4.7Z"
                fill="#5C5F5F"
              />
            </svg>
            <input
              name="email"
              placeholder="correo@email.com"
              className={`${
                errors.email ? "border-[#cc5555] border-2" : "border-[#8A8D8E]"
              } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
              type="text"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && (
            <p className="text-[#cc5555] text-sm pl-3">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.password ? "text-[#cc5555]" : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
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
              } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
              type={togglePassword ? "password" : "text"}
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <p className="text-[#cc5555] text-sm pl-3">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.confirmPassword ? "text-[#cc5555]" : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
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
              } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
              type={toggleConfirmPassword ? "password" : "text"}
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-[#cc5555] text-sm pl-3">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* CUIT/CUIL */}
        <div className="relative flex flex-col">
          <label
            className={`${
              errors.cuitCuil ? "text-[#cc5555]" : "text-[#8A8D8E]"
            } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1 text-gray-700`}
          >
            CUIT/CUIL
          </label>
          <div className="relative flex items-center">
            <input
              name="cuitCuil"
              placeholder="XX-XXXXXXXX-X"
              className={`${
                errors.cuitCuil
                  ? "border-[#cc5555] border-2"
                  : "border-[#8A8D8E]"
              } placeholder-[#A2A4A4] p-2 pl-2 rounded-full border-2 w-full`}
              type="text"
              value={formValues.cuitCuil}
              onChange={handleChange}
            />
          </div>
          {errors.cuitCuil && (
            <p className="text-[#cc5555] text-sm pl-3">{errors.cuitCuil}</p>
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
        <div className="flex justify-center">
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          ) : (
            <button
              className="bg-[#6750A4] text-white text-lg p-2 py-2.5 w-full rounded-full"
              type="submit"
            >
              Crear Cuenta
            </button>
          )}
        </div>
      </form>

      {/* MODAL */}
      <div
        className={`${
          showModal ? "fixed" : "hidden"
        } z-50 inset-0 flex justify-center items-center bg-black/50`}
      >
        <div className="bg-white p-8 rounded shadow-lg flex flex-col justify-center">
          <h1 className="text-lg font-semibold">Registro completado</h1>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            <Link href={'/login'}>Iniciar Sesion</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
