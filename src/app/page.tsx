'use client';

import React from "react";
import dynamic from "next/dynamic";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import Header from "@/components/header/Header";
import CardEventsSwiper from "@/components/CardEvents/CardsEvents";
import CrearEventoButton from "@/components/CreateEventButton/CreateEventButton";
import Newsletter from "@/components/Newsletter/Newsletter";
import NavBar from "@/components/navbar/NavBar";
import Link from "next/link";

const Dynamic = dynamic(() => import("./components/Map"), {
  loading: () => <p>...Loading</p>,
  ssr: false,
});

// Datos hardcodeados de eventos
const events = [
  {
    id: 1,
    name: "Evento Prueba 1",
    type: "Artístico",
    date: "2024-09-12",
    time: "15:45",
    location: {
      lat: "40.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 0.8,
    createdAt: "2024-09-15T20:03:58.892Z",
    userId: 1,
  },
  {
    id: 2,
    name: "Evento Prueba 2",
    type: "Artístico",
    date: "2024-09-12",
    time: "15:45",
    location: {
      lat: "46.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://www.iniseg.es/blog/seguridad/wp-content/uploads/2018/06/Blog-Aucal-41-820x410.png",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 0.8,
    createdAt: "2024-09-15T20:03:58.892Z",
    userId: 1,
  },
  {
    id: 3,
    name: "Evento Prueba 3",
    type: "Artístico",
    date: "2024-09-12",
    time: "15:45",
    location: {
      lat: "40.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://elolivar.es/olivar-content/uploads/2021/06/salones-para-eventos.png",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 0.8,
    createdAt: "2024-09-15T20:03:58.892Z",
    userId: 1,
  },
  {
    id: 4,
    name: "Evento Prueba 4",
    type: "Artístico",
    date: "2024-09-12",
    time: "15:45",
    location: {
      lat: "40.7128",
      lon: "-58.648416",
    },
    photos: [
      "https://elolivar.es/olivar-content/uploads/2021/06/salones-para-eventos.png",
    ],
    description: "Descripción del evento prueba nueva schema prisma",
    amount: 0.8,
    createdAt: "2024-09-15T20:03:58.892Z",
    userId: 1,
  },
];

export default function Home() {
  return (
    <main className=" bg-bgHome flex min-h-screen flex-col items-center p-5 relative min-w-[360px]">
      <header className="flex w-full justify-center sm:max-w-sm">
        <Header />
      </header>
      <div className="flex w-full justify-end pb-3">
        <Link href={'/createEvent'}>
          <CrearEventoButton />
        </Link>
      </div>
      <h4 className="font-semibold text-black text-sm pb-4">
        Optimizá tus rutas y maximizá tus ganancias
      </h4>
      <div className="flex justify-center w-full">
        <Dynamic />
      </div>
      <div className="flex flex-col sm:max-w-sm md:max-w-md lg:max-w-lg mt-5">
        <h6 className="text-black font-semibold mx-2">Categorías</h6>
        <HomeCategories />
        <h6 className="text-black font-semibold mx-2 mt-3">Eventos de hoy</h6>
      </div>
      <section className="pt-3">
        <CardEventsSwiper events={events} />
      </section>
      <div className="pt-5 pb-16 max-w-[384px]" >
        <Newsletter/>
      </div>
      <nav>
        <NavBar/>
      </nav>
    </main>
  );
}
