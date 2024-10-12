"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import ConcurrenceComponent from "../EventDetails/ConcurrenceComponent";
import DateTimeComponent from "../EventDetails/DateTimeComponent";
import { eventTypes } from "../../types/events-list-types";
import { useRouter } from "next/navigation";

interface EventProps {
  events: eventTypes[];
}

const CardEventsSwiper: React.FC<EventProps> = ({ events }) => {

  const router = useRouter();

  return (
    <Swiper
      spaceBetween={4}
      slidesPerView={1.6}
      className="w-80 !px-1"
      modules={[Pagination, Navigation]}
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <div
          className="p-0.5 bg-gradient-to-t from-violet-400 via-green-200 to-violet-400 rounded-lg w-48 shadow-[0px_2px_2px_1px_rgba(0,0,0,0.1)]"
          onClick={() => router.push(`/events/${event.id}`)}
          >
            <div className="border rounded-lg p-2 w-full h-auto min-h-32 bg-bgHome">
              <Image
                src={event.photos[0]}
                alt={event.name}
                width={200}
                height={300}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h2 className="font-semibold text-black text-base overflow-hidden whitespace-nowrap text-ellipsis">
                  {event.name}
                </h2>
                <div className="my-1">
                  <ConcurrenceComponent concurrence={event.amount} clas={false} />
                </div>
                <div className="my-1">
                  <DateTimeComponent size={'text-[12px] text-[#6750A4]'} date={event.date} time={event.time} />
                </div>
                <p className="text-sm w-full overflow-hidden text-ellipsis line-clamp-2">{event.addres}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardEventsSwiper;
