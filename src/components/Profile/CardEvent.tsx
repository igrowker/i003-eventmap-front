import Image from "next/image";
import DateTimeComponent from "../EventDetails/DateTimeComponent";
import ConcurrenceComponent from "../EventDetails/ConcurrenceComponent";
import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

interface Event {
  id: string;
  date: string;
  name: string;
  amount: number;
  addres: string;
  time: string;
  photos: string[];
}

function CardEvent({ date, time, name, amount, addres, photos, id }: Event) {

  const handleNavigation = (id: string) => {
      window.location.href = `/events/${id}`
  }

  return (
    <div onClick={() => handleNavigation(id)}  className="p-0.5 bg-gradient-to-t from-violet-400 via-green-200 to-violet-400 rounded-xl max-h-[280px]">
      <div className="w-full h-full bg-white rounded-xl flex gap-2">
        <div className="basis-[40%] pl-3 py-4 ">
          <Image
            src={photos[0] || "https://res.cloudinary.com/dyi5til4r/image/upload/v1721516995/669c42a6fdd4ca72f282d5dc/restaurant-photos/669c42a6fdd4ca72f282d5dc/1721516995007.webp"}
            alt="Event Image"
            width={300}
            height={400}
            priority={true}
            className="w-full min-w-[100px] h-[160px] object-cover rounded-lg"
          />
        </div>
        <div className="basis-[60%] flex flex-col px-1 mt-4 justify-between pb-4 max-w-[292px] overflow-hidden">
          <DateTimeComponent size={'text-[12px]'} date={date} time={time} />
          <h2 className="text-[#6750A4] font-semibold truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">{name}</h2>
          <div>
            <ConcurrenceComponent concurrence={amount} clas={false} />
          </div>

          <p className="truncate w-full overflow-hidden text-ellipsis whitespace-nowrap">{addres}</p>

          <div className="flex mt-2 gap-1">
            <Link onClick={(e) => e.stopPropagation()} href={`/editEvent/${id}`} className="w-full py-1.5 font-bold text-white bg-[#6750A4] rounded-full flex items-center justify-center gap-1 mr-2">
              <span className="text-sm">Editar</span>
              <AiOutlineEdit color="white" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardEvent;
