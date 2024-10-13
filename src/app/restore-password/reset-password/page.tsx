"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { iconShowPassword } from "@/components/icons/IconShowPassword";
import { iconHidePassword } from "@/components/icons/IconHidePassword";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/modals/modalPostEvent/CustomModal";
import Cookies from "js-cookie";
import { useUserContext } from "../../../components/UserContext";

const ResetPasswordPage = () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [togglePassword, setTogglePassword] = useState(true);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldStates, setFieldStates] = useState({
    password: { isFocused: false },
    confirmPassword: { isFocused: false },
  });
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      router.push("/login");
    }
  }, [searchParams]);

  const handleFocusBlur = (field: string, isFocused: boolean) => {
    setFieldStates((prev) => ({
      ...prev,
      [field]: { isFocused },
    }));
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!password.trim()) {
      setError("La contraseña es requerida");
      return;
    } else if (password.length < 8 || password.length > 16) {
      setError("La contraseña debe tener entre 8 y 16 caracteres");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("La contraseña debe tener al menos una letra mayúscula");
      return;
    } else if (!/[a-z]/.test(password)) {
      setError("La contraseña debe tener al menos una letra minúscula");
      return;
    } else if (!/\d/.test(password)) {
      setError("La contraseña debe tener al menos un número");
      return;
    } else if (!/[!@+#$%^&*()\[\]{}\-_,.]/.test(password)) {
      setError("La contraseña debe tener al menos un carácter especial");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/restore-password/reset-
password?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: password,
            repeatPassword: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        setError("Error al restablecer la contraseña");
        throw new Error("Error al restablecer la contraseña");
      } else {
        console.log(response);
        setModalOpen(true);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModal = () => {
    setModalOpen(true);
  }

  return (
    <div className="py-5 px-4">
      {modalOpen && (
        <CustomModal isOpen={handleModal} onClose={() => setModalOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="z-50 bg-white w-full mx-6 flex flex-col items-center p-4 shadow-lg rounded-2xl"
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 103 103"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_869_5781)">
                <circle cx="51.5" cy="47.5" r="47.5" fill="#07AEAF" />
                <path
                  d="M28 49.6667L48.6667 65.1667L74.5 29"
                  stroke="#F9F9F9"
                  stroke-width="4"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_869_5781"
                  x="0"
                  y="0"
                  width="103"
                  height="103"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_869_5781"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_869_5781"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>

            <h1 className="text-center text-lg font-semibold text-[#333333] py-2">
              Tu contraseña ha sido actualizada exitosamente
            </h1>
          </div>
        </CustomModal>
      )}
      <Link href={"/"}>
        <BiArrowBack className="mb-4" size={24} color="black" />
      </Link>
      <h1 className="font-bold text-xl mb-8">Olvidé mi contraseña</h1>
      <form className="" onSubmit={handleResetPassword}>
        {/* PASSWORD */}
        <h1 className="font-semibold text-[16px] mb-4">
          Ingresá tu nueva contraseña
        </h1>

        <div className="relative flex flex-col">
          <label
            className={`${
              error && !fieldStates.password.isFocused
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
                error ? "border-[#cc5555] border-2" : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
              type={togglePassword ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocusBlur("password", true)}
              onBlur={() => handleFocusBlur("password", false)}
              required
            />
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <h1 className="font-semibold text-[16px] mb-4 my-2">
          Confirmá tu nueva contraseña
        </h1>
        <div className="relative flex flex-col mt-4">
          <label
            className={`${
              error && !fieldStates.confirmPassword.isFocused
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
                error ? "border-[#cc5555] border-2" : "border-[#8A8D8E]"
              } placeholder-textPlaceholder font-normal focus-visible:outline-[#6750a4] p-2 pl-2 rounded-full border-2 w-full`}
              type={toggleConfirmPassword ? "password" : "text"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => handleFocusBlur("confirmPassword", true)}
              onBlur={() => handleFocusBlur("confirmPassword", false)}
              required
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-end my-1">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 bg-[#6750a4] text-white py-2.5 rounded-full w-full"
        >
          {loading ? "Cargando..." : "Aceptar"}
        </button>
      </form>
    </div>
  );
};

const ResetPasswordPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
};

export default ResetPasswordPageWrapper;