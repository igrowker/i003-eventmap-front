"use client";

import EventMapLogo from "@/../public/isotipo.webp";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validateEmail } from "@/utils/formUtils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { BiSolidEnvelope } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";

import { iconShowPassword } from "@/components/icons/IconShowPassword";
import { iconHidePassword } from "@/components/icons/IconHidePassword";
import toast, { Toaster } from "react-hot-toast";

import { FormValues, Errors, FormFieldStates } from "@/types/login-types";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [loginError, setLoginError] = useState("");
  const [togglePassword, setTogglePassword] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [fieldStates, setFieldStates] = useState<FormFieldStates>({
    email: { isFocused: false },
    password: { isFocused: false },
  });

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
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

    if (!formValues.password) newErrors.password = "La contraseña es requerido";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = handleError();

    if (Object.keys(newErrors).length === 0) {
      setLoginError("");

      toast.promise(loginUser(), {
        loading: "Iniciando sesión...",
        success: "Inicio de sesión exitoso!",
        error: "Los datos son incorrectos",
      });
    }
  };
  const loginUser = async () => {
    setLoading(true);
    try {
      const trimmedFormValues = {
        email: formValues.email.trim(),
        password: formValues.password,
      };
      // Enviar datos al backend
      const req = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmedFormValues),
        }
      );
      const res = await req.json();
      if (req.ok) {
        const token = res.token;
        Cookies.set("auth_token", token, {expires: 1});
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
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
         }
       }} />
      <div className="py-5 px-4">
        <Link href={"/"}>
          <BiArrowBack className="mb-4" size={24} color="white" />
        </Link>

        <h1 className="font-bold text-2xl text-white">Iniciar sesión</h1>
        <div className="flex flex-col items-center gap-4 py-6">
          <Image
            className=""
            width={140}
            height={140}
            src={EventMapLogo}
            alt="Logo EventMap"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded-t-3xl px-4"
      >
        <p className="font-bold text-center my-8">
          Ingreso sólo para organizadores
        </p>
        <div className="flex flex-col gap-4">
          <div className="relative flex flex-col">
            <label
              className={`${
                errors.email && !fieldStates.email.isFocused
                  ? "text-[#cc5555]"
                  : fieldStates.email.isFocused
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
                value={formValues.email}
                onChange={handleChange}
                onFocus={() =>
                  setFieldStates((prev) => ({
                    ...prev,
                    email: { isFocused: true },
                  }))
                }
                onBlur={() =>
                  setFieldStates((prev) => ({
                    ...prev,
                    email: { isFocused: false },
                  }))
                }
              />
            </div>

            {errors.email && (
              <p className="text-[#cc5555] text-sm pt-1 text-end">
                {errors.email}
              </p>
            )}
          </div>

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
                placeholder="********"
                className={`${
                  errors.password
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
                type={togglePassword ? "password" : "text"}
                value={formValues.password}
                onChange={handleChange}
                onFocus={() =>
                  setFieldStates((prev) => ({
                    ...prev,
                    password: { isFocused: true },
                  }))
                }
                onBlur={() =>
                  setFieldStates((prev) => ({
                    ...prev,
                    password: { isFocused: false },
                  }))
                }
              />
            </div>

            {errors.password && (
              <p className="text-[#cc5555] text-sm pt-1 text-end">
                {errors.password}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end pr-2 pt-1">
          <button className="underline text-[#5C5F5F]">
            Olvidé mi contraseña
          </button>
        </div>
        {/* {loading ? (
          <div className="w-full flex justify-center my-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          </div>
        ) : (
          
        )} */}
        <>
          {loginError && (
            <div className="text-[#cc5555] text-sm text-end pt-1">
              {loginError}
            </div>
          )}
          <button
            className={`${loading ? 'opacity-50 cursor-none' : ''} bg-[#6750A4] text-white text-lg p-2 py-2.5 my-4 w-full rounded-full`}
            type="submit"
          >
            Ingresar
          </button>
        </>

        <div>
          <p className="text-center text-[#5C5F5F]">
            ¿No tenés cuenta?{" "}
            <Link href={"/register"} className="text-[#6750a4]">
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
