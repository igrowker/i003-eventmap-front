import { eventTypes } from "@/types/events-list-types"
import { getEventTimeFormatted } from "@/utils/getEventTimeFormatted"
import Image from "next/image"

export default function CardEventList({ event, lastCardRef }: { event: eventTypes, lastCardRef: React.RefObject<HTMLDivElement> | null }) {
  const { img, name, date, location, type } = event

  return (
    <div ref={lastCardRef} className="flex-1 flex sm:flex-col gap-4 bg-neutral-100 border rounded-lg p-4">
      {
        img
          ? <Image width={180} height={180} src={img} alt={`Imagen de ${name}`} className="max-sm:min-w-[180px] sm:w-full h-[180px] bg-gray-400 rounded-lg" />
          : <div className="max-sm:min-w-[180px] sm:w-full h-[180px] bg-gray-400 rounded-lg"></div>
      }
      <div className="flex flex-col gap-2">
        <small className="w-fit bg-dark/40 px-4 text-light font-semibold capitalize text-xs border border-dark rounded-full">{type}</small>
        <span className="text-sm md:text-xs first-letter:uppercase line-clamp-2">{getEventTimeFormatted(date)}</span>
        <h2 className="text-lg font-semibold text-pretty line-clamp-2">{name}</h2>
        <p className="text-sm md:text-xs text-pretty line-clamp-2">{location}</p>
      </div>
    </div>
  )
}