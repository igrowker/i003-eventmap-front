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
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [loginError, setLoginError] = useState("");

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

    if (!formValues.password) newErrors.password = "La contraseña es requerida";

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = handleError();

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setLoginError("");

      try {
        const trimmedFormValues = {
          email: formValues.email.trim(),
          password: formValues.password,
        };
        //Enviar datos al backend
        const req = await fetch(
          "https://i003-eventmap-back.onrender.com/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmedFormValues),
          }
        );
        const res = await req.json();
        console.log(res);
        if (req.ok) {
          setUser(res.profile.name);
          setShowModal(true);
        } else {
          setLoginError("Datos incorrectos, intenta de nuevo.");
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        setLoginError("Hubo un problema al intentar conectarse al servidor.");
      } finally {
        setLoading(false);
      }
    }
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
              className={` ${
                errors.email ? "text-[#cc5555]" : "text-[#8A8D8E]"
              } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
            >
              Correo
            </label>

            <div className="relative flex items-center">
              <svg
                className="absolute right-3"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V6C22 5.46957 21.7893 4.96086 21.4142 4.58579C21.0391 4.21071 20.5304 4 20 4ZM20 8.7L12 14.034L4 8.7V6.297L12 11.63L20 6.297V8.7Z"
                  fill="#5C5F5F"
                />
              </svg>

              <input
                name="email"
                placeholder="correo@email.com"
                className={`${
                  errors.email
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-gray-700 p-2 pl-2 rounded-full border-2  w-full`}
                type="text"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>

            {errors.email && (
              <p className="text-[#cc5555] text-sm pl-3 ">{errors.email}</p>
            )}
          </div>

          <div className="relative flex flex-col">
            <label
              className={` ${
                errors.password ? "text-[#cc5555]" : "text-[#8A8D8E]"
              } absolute z-30 left-2.5 -top-2 text-xs font-bold bg-white px-1`}
            >
              Contraseña
            </label>

            <div className="relative flex items-center">
              <svg
                className="absolute right-3"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17C8.15196 16.9985 9.26816 16.5998 10.1604 15.8711C11.0526 15.1424 11.6663 14.1284 11.898 13H14V15H16V13H18V16H20V13H21V11H11.898C11.6663 9.87158 11.0526 8.85755 10.1604 8.1289C9.26816 7.40025 8.15196 7.00154 7 7C4.243 7 2 9.243 2 12C2 14.757 4.243 17 7 17ZM7 9C8.654 9 10 10.346 10 12C10 13.654 8.654 15 7 15C5.346 15 4 13.654 4 12C4 10.346 5.346 9 7 9Z"
                  fill="#5C5F5F"
                />
              </svg>

              <input
                name="password"
                placeholder="********"
                className={`${
                  errors.password
                    ? "border-[#cc5555] border-2"
                    : "border-[#8A8D8E]"
                } placeholder-gray-700 p-2 pl-2 rounded-full border-2 w-full`}
                type="password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>

            {errors.password && (
              <p className="text-[#cc5555] text-sm pl-3">{errors.password}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end pr-2 pt-1">
          <button className="underline text-[#5C5F5F]">
            Olvidé mi contraseña
          </button>
        </div>
        {/* <span className="my-3 text-center text-gray-700">O</span>
        <div className="flex flex-col gap-4">
          <button className="border border-black w-full rounded-lg p-2 font-bold">
            Gmail
          </button>
          <button className="border border-black w-full rounded-lg p-2 font-bold">
            Facebook
          </button>
        </div> */}

        {loading ? (
          <div className="w-full flex justify-center my-4">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          </div>
        ) : (
          <>
            {loginError && (
              <div className="text-center text-[#cc5555]">{loginError}</div>
            )}
            <button
              className="bg-[#6750A4] text-white text-lg p-2 py-2.5 my-4 w-full rounded-full"
              type="submit"
            >
              Ingresar
            </button>
          </>
        )}

        <div>
          <p className="text-center text-[#5C5F5F]">
            ¿No tenés cuenta?{" "}
            <Link href={"/register"} className="text-[#6750a4]">
              Registrate
            </Link>
          </p>
        </div>
      </form>
      <div
        className={`${
          showModal ? "fixed" : "hidden"
        } z-50 inset-0 flex justify-center items-center bg-black/50`}
      >
        <div className="bg-white p-8 rounded shadow-lg text-center">
          <h1 className="text-lg">
            Sesion Iniciada! Bienvenido{" "}
            <span className="font-bold">{user}</span>
          </h1>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
