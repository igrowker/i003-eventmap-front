import { eventTypes } from "@/types/events-list-types"
import { getEventTimeFormatted } from "@/utils/getEventTimeFormatted"
import Image from "next/image"
import HeartIcon from "@/assets/icons/heart-icon.svg"
import ShareIcon from "@/assets/icons/share-icon.svg"
import { FaUsers } from "react-icons/fa6"
import { getCapacityAndColor } from "@/utils/getCapacityAndColor"
import DefaultNoPhoto from '@/assets/icons/default-no-photo.png'
import ConcurrenceComponent from "../EventDetails/ConcurrenceComponent"

export default function CardEventList({ event, lastCardRef }: { event: eventTypes, lastCardRef: React.RefObject<HTMLDivElement> | null }) {
  const { photos, name, date, description, type, capacity, amount, time, addres } = event

  // const handleShareEvent = async () => {
  //   if (!navigator.share) return
  //   const shareData = {
  //     title: name,
  //     text: description,
  //     url: window.location.href
  //   }
  //   await navigator.share(shareData)
  // }

  return (
    <div className="p-0.5 bg-gradient-to-t from-violet-400 via-green-200 to-violet-400 rounded-lg overflow-x-hidden">
      <div className="w-full h-full bg-white rounded-lg">
        <div ref={lastCardRef} className="relative flex-1 flex sm:flex-col gap-2 bg-light border rounded-lg p-2 shadow-md">
          {/* Estos divs sirven para que los colores se carguen antes de llamarlos con la getCapacityAndColor() */}
          <div className="hidden text-normal"></div>
          <div className="hidden text-medium"></div>
          <div className="hidden text-high"></div>
          <div className="hidden text-massive"></div>
          {
            photos[0]
              ? <img src={photos[0]} alt={`Imagen de ${name}`} className="w-[104px] sm:w-full h-[144px] bg-gray-400 rounded-lg object-cover" />
              : <div className="flex justify-center items-center max-sm:min-w-[180px] sm:w-full max-sm:h-auto h-[180px] rounded-lg object-cover border">
                  <Image src={DefaultNoPhoto} alt="Imagen no disponible" width={140} height={140} />
                </div>
          }
          <div className="flex flex-1 flex-col gap-1 justify-center">
            {/* <small className="w-fit bg-dark/40 px-4 text-light font-semibold capitalize text-xs border border-dark rounded-full">{type}</small> */}
            <span className="text-sm md:text-xs first-letter:uppercase line-clamp-1">{getEventTimeFormatted(date)}, {time}</span>
            <h2 className="text-lg font-semibold text-pretty line-clamp-1 overflow-x-hidden whitespace-break-spaces">{name}</h2>
            {/* <span className={`${getCapacityAndColor(capacity).color} flex gap-2 items-center`}><FaUsers width={15} height={15} /> Concurrencia: {getCapacityAndColor(capacity).capacity}</span>  */}
            <ConcurrenceComponent concurrence={amount} clas={false} />
            <p className="text-sm md:text-xs text-pretty line-clamp-1 break-all">{addres}</p>
            <div className="sm:absolute bottom-4 right-4 flex gap-4 max-sm:mt-2 items-center">
              {/* <button><HeartIcon alt="agregar favoritos" width={20} height={20} /></button> */}
              <button className="text-xs bg-createEventButton text-white px-4 py-1 rounded-full">Ver más</button>
              {/* <button onClick={handleShareEvent}><ShareIcon alt="compartir" width={18} height={18} /></button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}