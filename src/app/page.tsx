import React from "react";
import dynamic from "next/dynamic";
import HomeCategories from "@/components/HomeCategories/HomeCategories";

const Dynamic = dynamic(() => import("./components/Map"), {
  loading: () => <p>...Loading</p>,
  ssr: false,
});

export default function Home() {
  return (
    <main className=" bg-bgHome flex min-h-screen flex-col items-center p-5">
      <div className="flex justify-center w-full">
        <Dynamic />
      </div>
      <div className="flex flex-col sm:max-w-sm md:max-w-md lg:max-w-lg mt-5">
        <h6 className="text-black font-latoBold mx-2">Categorías</h6>
        <HomeCategories />
        <h6 className="text-black font-latoBold mx-2 mt-5">Eventos de hoy</h6>
      </div>
    </main>
  );
}
