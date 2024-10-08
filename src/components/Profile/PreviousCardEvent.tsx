import Image from "next/image";
import DateTimeComponent from "../EventDetails/DateTimeComponent";
import ConcurrenceComponent from "../EventDetails/ConcurrenceComponent";

import { Event } from "@/types/events-types";

function PreviousCardEvent({
  date,
  time,
  name,
  amount,
  addres,
  photos,
  id,
}: Event) {
  const defaultImage =
    "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp";

  const imageSrc =
    Array.isArray(photos) && photos.length > 0 ? photos[0] : defaultImage;

  return (
    <div onClick={() => window.open(`/events/${id}`)} className="p-0.5 bg-gradient-to-t from-violet-400 via-green-200 to-violet-400 rounded-xl max-h-[285px]">
      <div className="w-full h-full bg-white rounded-xl flex flex-col">
        <div className="p-3">
          <Image
            src={imageSrc}
            alt="Event Image"
            width={300}
            height={400}
            priority={true}
            className="w-full min-w-[100px] h-[127px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between overflow-hidden px-2 py-1">
          <h2 className="text-[#191C1C] font-semibold truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">{name}</h2>
          <div>
            <ConcurrenceComponent concurrence={amount} clas={false} />
          </div>
          <DateTimeComponent size={"text-[12px] text-[#6750A4]"} date={date} time={time} />
          <p className="text-[14px] truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {addres}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreviousCardEvent;
