import { SwiperSlide, Swiper } from "swiper/react";

import { Pagination } from "swiper/modules";
import PreviousCardEvent from "./PreviousCardEvent";
import "swiper/css";

import { PreviousEventContainerProps } from "@/types/events-types";

function PreviousEventCointainer({ events } : PreviousEventContainerProps ) {

  if (!events || events.length === 0) {
    return <p>No hay eventos disponibles.</p>;
  }

  return (
    <div className="-mr-3 flex">
      <Swiper
        slidesPerView={1.9}
        spaceBetween={8}
        modules={[Pagination]}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <PreviousCardEvent
              id={event.id}
              date={event.date}
              time={event.time}
              name={event.name}
              amount={event.amount}
              addres={event.addres}
              photos={event.photos}
            />
          </SwiperSlide>
        ))}
        
      </Swiper>
    </div>
  );
}

export default PreviousEventCointainer;
