"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

import ConcurrenceComponent from "@/components/EventDetails/ConcurrenceComponent";
import DateTimeComponent from "@/components/EventDetails/DateTimeComponent";

interface Event {
  time: string;
  date: string;
  amount: number;
  photos: string[];
  name: string;
  addres: string;
  description: string;
}

function EventDetails() {
  const [event, setEvent] = useState<Event | null>(null);
  const path = usePathname();
  const id = path.split("/")[2];
  // const id = "4fdbcb80-0d17-4ac5-a8dc-d9fd7495df16";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `https://i003-eventmap-back.onrender.com/events/event/${id}`
        );
        if (!response.ok) {
          throw new Error("Error en la peticion");
        }
        const data: Event = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Error al obtener evento", error);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  console.log(event);

  if (!event) {
    return <div>Cargando evento...</div>;
  }

  const { time, date, amount, photos, name, addres, description } = event;

  return (
    <div>
      <div className="relative">
        <Link href={"/events"}>
          <BiArrowBack
            className="mb-4 absolute top-4 left-4"
            size={24}
            color="black"
          />
        </Link>

        {photos && (
          <Image
            className="object-cover w-full h-[350px] max-h-[420px] max-w-[420px]"
            src={photos[0]}
            alt="Event Image"
            width={400}
            height={300}
            priority={true}
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-4">
        <ConcurrenceComponent concurrence={amount} clas={true} />
        <DateTimeComponent size={14} date={date} time={time} />
        <div className="flex flex-col gap-2">
          <h1 className="text-[18px] font-semibold text-[#6750A4]">{name}</h1>
          <p className="text-[#454747] text-[15px]">{description}</p>
        </div>
        <div>
          <h1 className="text-[16px] font-semibold text-[#454747] py-1">
            Ubicación:
          </h1>
          <p className="text-[#454747] text-[15px]">{addres}</p>
        </div>
        <button className="w-full py-2.5 font-bold text-white bg-[#6750A4] rounded-full flex items-center justify-center gap-2">
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5309 3.59808C18.7223 3.13323 18.6129 2.59808 18.2574 2.24261C17.902 1.88714 17.3668 1.77777 16.902 1.96917L3.15196 7.59417C2.59727 7.82073 2.28477 8.40667 2.39806 8.99261C2.51134 9.57855 3.02696 10.0004 3.62462 10.0004H10.4996V16.8754C10.4996 17.4731 10.9215 17.9848 11.5074 18.102C12.0934 18.2192 12.6793 17.9028 12.9059 17.3481L18.5309 3.59808Z"
              stroke="white"
              stroke-width="1.5"
            />
          </svg>

          <span>ir a destino</span>
        </button>
      </div>
    </div>
  );
}

export default EventDetails;
