"use client";

import Link from "next/link";
import useDecodedToken from "./functions/useDecodeToken";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { GiPartyFlags } from "react-icons/gi";
import SliderEventContainer from "@/components/Profile/SliderEventContainer";
import { useEffect, useState } from "react";
import useUserInfo from "./functions/useUserInfo";
import { Event } from "@/types/events-types";
import PreviousEventCointainer from "@/components/Profile/PreviousEventContainer";
import EmptyEvents from "@/components/Profile/EmptyEvents";

import toast, {Toaster} from "react-hot-toast";

function Profile() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { userId } = useDecodedToken();
  const userInfo = useUserInfo(userId);

  useEffect(() => {
    if (userInfo) {
      setEvents(userInfo.events);
      setLoading(false);
    }
  }, [userInfo]);
  console.log(userInfo)

  const logOutToast = () => {
    toast.success("Sesion cerrada");
  }

  const previousEvents = (events: Event[]) => {
    const today = new Date();
    return events.filter((event) => new Date(event.date) < today);
  };

  const upcomingEvents = (events: Event[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return events.filter((event) => new Date(event.date) >= today);
  };

  const handleLogout = () => {
    logOutToast();
    setTimeout(() => {
      Cookies.remove("auth_token");
      router.push("/");
    }, 850);
  };

  return (
    <section className="px-3 py-5">
      <Toaster toastOptions={{
         duration: 1500,
         position: "top-center",
         className: "w-full",
         style: {
           background: "#e5dff7",
           color: "#6750A4",
           padding: "25px",
           fontWeight: "bold",
           fontSize: "17px",
         }
       }}/>
      <Link href={"/"}>
        <BiArrowBack className="mb-4 top-3 left-3" size={24} color="black" />
      </Link>
      <div className="flex justify-between items-center">
        <h1 className="text-black text-2xl font-bold">Organizador</h1>
        <button onClick={handleLogout} className="text-[#6750A4] underline">
          Cerrar sesión
        </button>
      </div>
      <div className="items-center gap-1 my-2 py-0.5 px-2 rounded-full border border-[#6750A4] inline-flex">
        <BsFillPersonFill size={20} color="#6750A4" />
        <h2 className="font-semibold">
          {userInfo?.name} {userInfo?.lastName}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-md">Mis próximos eventos</h2>

        {/* UPCOMING EVENTS */}
        {loading ? (
          <div className="w-full flex justify-center my-4 h-[200px] items-center">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          </div>
        ) : (
          <>
            {events.length > 0 ? (
              <SliderEventContainer events={upcomingEvents(events)} />
            ) : (
              <EmptyEvents text="No hay eventos agregados" />
            )}
          </>
        )}
      </div>

      <Link
        href={"/createEvent"}
        className="bg-[#6750A4] my-4 flex items-center w-full py-2.5 rounded-full justify-center gap-2 text-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5938 9.375H10.625V6.40625C10.625 6.32031 10.5547 6.25 10.4688 6.25H9.53125C9.44531 6.25 9.375 6.32031 9.375 6.40625V9.375H6.40625C6.32031 9.375 6.25 9.44531 6.25 9.53125V10.4688C6.25 10.5547 6.32031 10.625 6.40625 10.625H9.375V13.5938C9.375 13.6797 9.44531 13.75 9.53125 13.75H10.4688C10.5547 13.75 10.625 13.6797 10.625 13.5938V10.625H13.5938C13.6797 10.625 13.75 10.5547 13.75 10.4688V9.53125C13.75 9.44531 13.6797 9.375 13.5938 9.375Z"
            fill="white"
          />
          <path
            d="M10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.832 5.16797 18.75 10 18.75C14.832 18.75 18.75 14.832 18.75 10C18.75 5.16797 14.832 1.25 10 1.25ZM10 17.2656C5.98828 17.2656 2.73438 14.0117 2.73438 10C2.73438 5.98828 5.98828 2.73438 10 2.73438C14.0117 2.73438 17.2656 5.98828 17.2656 10C17.2656 14.0117 14.0117 17.2656 10 17.2656Z"
            fill="white"
          />
        </svg>
        <span>Crear evento</span>
      </Link>

      <div className="bg-white rounded-xl p-3 mt-4 flex items-center gap-5 shadow-md shadow-gray-400">
        <div className="px-4">
          <GiPartyFlags size={64} color="#6750A4" />
        </div>

        <div className="flex flex-col">
          <h1 className="font-bold text-3xl">{events.length}</h1>
          <p>Eventos realizados este año</p>
        </div>
      </div>

      {/* PREVIOUS EVENTS */}
      <div className="mb-12">
        <h2 className="flex font-semibold py-4 text-md">Eventos anteriores</h2>

        {/* Spinner para PREVIOUS EVENTS */}
        {loading ? (
          <div className="w-full flex justify-center my-4 h-[200px] items-center">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
          </div>
        ) : (
          <>
            {events.length > 0 ? (
              <PreviousEventCointainer events={previousEvents(events)} />
            ) : (
              <EmptyEvents text="No hay eventos anteriores" />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Profile;
