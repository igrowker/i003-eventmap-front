'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Pagination, Navigation } from 'swiper/modules';

interface Event {
    id: number;
    name: string;
    type: string;
    date: string;
    time: string;
    location: {
      lat: string;
      lon: string;
    };
    photos: string[];
    description: string;
    amount: number;
    createdAt: string;
    userId: number;
  }

interface EventProps {
  events: Event[];
}

const CardEventsSwiper: React.FC<EventProps> = ({ events }) => {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={2}
      pagination={{ clickable: true }}
      navigation={true}
      scrollbar={{draggable: true}}
      className='w-80'
      modules={[Pagination, Navigation]}
    >
      {events.map((event) => (
        <SwiperSlide key={event.id}>
          <div className="border rounded-lg shadow-md p-3 w-full h-auto min-h-32">{/* Ajusta el tamaño según tus necesidades */}
            <img
              src={event.photos[0]}
              alt={event.name}
              className="w-full h-32 object-cover rounded-lg" // Asegúrate de que las imágenes se ajusten correctamente
            />
            <div className="mt-2">
              <h2 className="font-semibold text-black text-sm">{event.name}</h2>
              <p className="text-red-400 text-sm">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 pt-2">
                Lat: {event.location.lat}, Lon: {event.location.lon}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardEventsSwiper;