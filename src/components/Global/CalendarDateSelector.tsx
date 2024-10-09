import { BiCalendarAlt } from "react-icons/bi"
import { MAX_RANGE_DAYS_MS } from "@/constants/filter-resources";
import { Filters, FilterValues } from "@/types/filter-types";

export default function CalendarDateSelector({ handleChange, filters, section = 'list' }: { handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, filters: Filters[] | FilterValues, section?: 'filter' | 'list' }) {
  const max = new Date(new Date().getTime() + MAX_RANGE_DAYS_MS).toISOString().split('T')[0]
  const min = new Date().toISOString().split('T')[0]
  const filterDate = 
  section === 'list'
  // @ts-ignore
    ? filters?.find(filter => filter.property === 'date')?.filterValue
        // @ts-ignore
      ? new Date(filters?.find(filter => filter.property === 'date')?.filterValue)?.toLocaleString('es-AR', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
      }).replace('-', ' ')
      : null
      // @ts-ignore
    : filters?.date ? new Date(filters?.date)?.toLocaleString('es-AR', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
      }).replace('-', ' ')
    : null
  return (
    <label className="relative flex flex-1 gap-2 justify-between items-center cursor-pointer border py-2 px-4 bg-white rounded-full" htmlFor="filter-date-to">
      <span>{filterDate ?? 'Seleccionar fecha'}</span>
      <div>
        <BiCalendarAlt width={20} height={20} />
        <input className="datepicker-input" onChange={handleChange} type="date" name='date' id="filter-date-to" min={min} max={max} />
      </div>
    </label>
  )
}