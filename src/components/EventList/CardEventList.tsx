import { eventTypes } from "@/types/events-list-types"
import { getEventTimeFormatted } from "@/utils/getEventTimeFormatted"
import Image from "next/image"
import heartIcon from "@/assets/icons/heart-icon.svg"
import shareIcon from "@/assets/icons/share-icon.svg"

export default function CardEventList({ event, lastCardRef }: { event: eventTypes, lastCardRef: React.RefObject<HTMLDivElement> | null }) {
  const { photos, name, date, description, type } = event

  const handleShareEvent = async () => {
    if (!navigator.share) return
    const shareData = {
      title: name,
      text: description,
      url: window.location.href
    }
    await navigator.share(shareData)
  }

  return (
    <div ref={lastCardRef} className="relative flex-1 flex sm:flex-col gap-4 bg-light border rounded-lg p-4 shadow-md">
      {
        photos[0]
          ? <img width={180} height={180} src={photos[0]} alt={`Imagen de ${name}`} className="max-sm:min-w-[120px] sm:w-full max-sm:h-auto h-[180px] bg-gray-400 rounded-lg object-cover" />
          : <div className="max-sm:min-w-[180px] sm:w-full h-[180px] bg-gray-400 rounded-lg"></div>
      }
      <div className="flex flex-1 flex-col gap-2">
        {/* <small className="w-fit bg-dark/40 px-4 text-light font-semibold capitalize text-xs border border-dark rounded-full">{type}</small> */}
        <span className="text-sm md:text-xs first-letter:uppercase line-clamp-2">{getEventTimeFormatted(date)}</span>
        <h2 className="text-lg font-semibold text-pretty line-clamp-2">{name}</h2>
        <p className="text-sm md:text-xs text-pretty line-clamp-2">{description}</p>
        <div className="sm:absolute bottom-4 right-4 flex gap-4 max-sm:justify-end max-sm:mt-2 items-center">
          <button><Image src={heartIcon} alt="agregar favoritos" width={20} height={20} /></button>
          <button onClick={handleShareEvent}><Image src={shareIcon} alt="compartir" width={18} height={18} /></button>
        </div>
      </div>
    </div>
  )
}