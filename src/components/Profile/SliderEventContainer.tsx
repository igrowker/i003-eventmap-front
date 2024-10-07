import { SwiperSlide, Swiper } from "swiper/react";

import { Pagination } from "swiper/modules";
import CardEvent from "./CardEvent";
import "swiper/css";

import { SliderEventContainerProps } from "@/types/events-types";

function SliderEventContainer({ events } : SliderEventContainerProps ) {


  if (!events || events.length === 0) {
    return <p>No hay eventos disponibles.</p>;
  }

  return (
    <div className="-mr-3">
      <Swiper
        spaceBetween={8}
        slidesPerView={1.15}
        modules={[Pagination]}
        className="mySwiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <CardEvent
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

export default SliderEventContainer;
