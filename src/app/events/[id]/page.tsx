"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import ConcurrenceComponent from "@/components/EventDetails/ConcurrenceComponent";
import DateTimeComponent from "@/components/EventDetails/DateTimeComponent";
import CustomModal from "@/components/modals/modalPostEvent/CustomModal";
import ModalImage from "@/../public/eventdetailmodal.png";
import NoImage from "@/../public/noImage.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/pagination';

interface Event {
  time: string;
  date: string;
  amount: number;
  photos: string[];
  name: string;
  addres: string;
  description: string;
  location: {
    lat: string;
    lon: string;
  };
}

function EventDetails() {
  const [event, setEvent] = useState<Event | null>(null);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const path = usePathname();
  const id = path.split("/")[2];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/events/event/${id}`);
        if (!response.ok) {
          throw new Error("Error en la peticion");
        }
        const data: Event = await response.json();
        setEvent(data);
        console.log(data);
      } catch (error) {
        console.error("Error al obtener evento", error);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [API_URL, id]);

  if (!event) {
    return (
      <div className="h-screen flex flex-col gap-2 justify-center items-center">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current"></div>
      </div>
    );
  }

  const { time, date, amount, photos, name, addres, description, location } =
    event;

  const handleNavigateClick = () => {
    setModalOpen(true);
  };

  const handleGoogleMapsClick = () => {
    window.open(
      `https://maps.google.com/maps?daddr=${location.lat},${location.lon}`,
      "_blank"
    );
    setModalOpen(false);
  };

  const handleWazeClick = () => {
    window.open(
      `https://waze.com/ul?ll=${location.lat},${location.lon}&navigate=yes`,
      "_blank"
    );
    setModalOpen(false);
  };

  return (
    <div className="mb-14">
      <div className="relative">
        <button className="absolute" onClick={() => router.back()}>
          <BiArrowBack
            className="mb-4 absolute top-4 left-4 z-10"
            size={24}
            color="black"
          />
        </button>
<<<<<<< HEAD
        <Swiper
          spaceBetween={2}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          
          className="mySwiper"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={index}>
              <Image
                className="object-cover w-full h-[280px] max-h-[420px] max-w-[420px]"
                src={photo || NoImage}
                alt="Event Image"
                width={400}
                height={280}
                priority={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
=======
        {photos && (
          <Image
            className="object-cover w-full h-[180px] max-h-[420px] max-w-[420px]"
            src={photos[0] || NoImage}
            alt="Event Image"
            width={400}
            height={100}
            priority={true}
          />
        )}
>>>>>>> 70bf95c3a8877b213543ba6c085ab86180228d18
      </div>
<div className="flex flex-col gap-4 p-4 mb-10">
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

        <button
          onClick={handleNavigateClick}
          className="w-full py-2.5 font-bold text-white bg-[#6750A4] rounded-full flex items-center justify-center gap-2"
        >
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
              strokeWidth="1.5"
            />
          </svg>
          <span>Ir a destino</span>
        </button>
      </div>
      {modalOpen && (
        <CustomModal
          isOpen={handleNavigateClick}
          onClose={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="z-50 bg-white w-full mx-6 flex flex-col items-center p-4 shadow-lg rounded-2xl"
          >
            <Image
              src={ModalImage}
              alt="Modal Image"
              width={150}
              height={150}
              priority={true}
            />
            <h1 className=" text-sm font-semibold text-[#292929] py-2">
              Seleccioná una aplicación para acceder a la ubicación del evento
            </h1>
            <div className="flex flex-col gap-4 mt-4 w-full">
              <button
                onClick={handleGoogleMapsClick}
                className="py-2 px-4 font-semibold text-sm text-white bg-[#6750A4] rounded-full"
              >
                Google Maps
              </button>
              <button
                onClick={handleWazeClick}
                className="py-2 px-4 font-semibold text-sm text-[#6750A4] border-[2px] border-[#6750A4]  rounded-full"
              >
                Waze
              </button>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default EventDetails;
