import NotFoundImage from "@/../public/notfound.png";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="justify-center items-center flex flex-col h-screen px-3 gap-3">
      <Image src={NotFoundImage} alt="Event Image" width={222} height={167} />
      <h1 className="text-2xl text-[#191C1C] font-bold">Error 404</h1>
      <p className="text-lg text-[#191C1C] text-center">
        Esta dirección no está disponible en este momento.
      </p>
      <Link className="w-full" href={"/"}>
        <button className="bg-[#6750A4] text-white text-lg p-2 py-2.5 my-4 w-full rounded-full">
          Volver
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
