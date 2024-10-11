"use client";
import dynamic from "next/dynamic";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import Header from "@/components/header/Header";
import CardEventsSwiper from "@/components/CardEvents/CardsEvents";
import Newsletter from "@/components/Newsletter/Newsletter";
import useGetAllEventsFree from "../hooks/useGetAllProjectsFree";
import ErrorEvents from '@/assets/images/error-events.png'
import Image from "next/image";

const Dynamic = dynamic(() => import("./components/Map"), {
  loading: () => (
    <>
      <div className="flex justify-center items-center flex-col">
        <p>...Loading </p>
        <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-green-200 via-green-500 to-red-800 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-600 rounded-full border-2 border-white"></div>
        </div>
      </div>
    </>
  ),
  ssr: false,
});

export default function Home() {

  const { events, error} = useGetAllEventsFree();

  return (
    <main className=" bg-bgHome flex min-h-screen flex-col items-center p-5 relative min-w-[360px]">
      <header className="flex w-full justify-center sm:max-w-sm">
        <Header />
      </header>
      <h4 className="font-semibold text-black text-base py-4">
        Optimizá tus rutas y maximizá tus ganancias
      </h4>
      <div className="flex justify-center w-full">
        <Dynamic />
      </div>
      <div className="flex flex-col sm:max-w-sm md:max-w-md lg:max-w-lg mt-5">
        <h6 className="text-black font-semibold mx-2">Categorías</h6>
        <HomeCategories />
        <h6 className="text-black font-semibold mx-2 mt-3 mb-2">Eventos de hoy</h6>
      </div>
      <section className="">
      {events.length < 0 || error ? (
        <div>
          <div className="p-0.5 bg-gradient-to-t from-violet-400 via-green-200 to-violet-400 rounded-lg shadow-[0px_2px_2px_1px_rgba(0,0,0,0.1)]">
            <Image
            src={ErrorEvents}
            alt="Imagen no disponible"
            width={328}
            height={229}
            className="bg-white rounded-lg"
            />
          </div>
            <p className="text-center font-semibold pt-2">
              No hay eventos disponibles en la zona.
            </p>
        </div>
          ) : ( <CardEventsSwiper events={events} />)
      }
      </section>
      <div className="pt-5 pb-16 max-w-[384px]">
        <Newsletter />
      </div>
    </main>
  );
}
