import Image from "next/image";
import calendarIcon from "@/assets/icons/calendar-icon.svg"
import { useMemo } from "react";
import { MAX_RANGE_DAYS_MS } from "@/constants/filter-resources";

export default function CalendarDateSelector({ handleChange }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const max = useMemo(() => new Date(new Date().getTime() + MAX_RANGE_DAYS_MS).toISOString().split('T')[0], [])
  const min = useMemo(() => new Date().toISOString().split('T')[0], [])
  return (
    <label className="relative flex gap-2 items-center cursor-pointer" htmlFor="filter-date-to">
      <span>Ver eventos hasta</span>
      <Image src={calendarIcon} alt="calendario icono" width={20} height={20} />
      <input className="datepicker-input" onChange={handleChange} type="date" id="filter-date-to" min={min} max={max} />
    </label>
  )
}