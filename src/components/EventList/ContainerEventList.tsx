import { EVENTS_LIST } from "@/mocks/events-list-mock";
import CardEventList from "./CardEventList";
import { eventTypes } from "@/types/events-list-types";
import { filterDateTo, getDateByFilterDate } from "@/utils/getDateByFilterDate";
import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";
import { useEffect, useRef, useState } from "react";
import { Filters } from "@/types/filter-types";
import { getEvents } from "@/utils/getEvents";
import Link from "next/link";

export default function ContainerEventList({ filtersForEvents = [], executeFilterState }: { filtersForEvents: Filters[] | [], executeFilterState: { executeFilter: boolean, setExecuteFilter: (value: boolean) => void } }) {
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [eventsList, setEventsList] = useState<eventTypes[]>([])
  const [eventsListFiltered, setEventsListFiltered] = useState<eventTypes[]>([])
  const [currentLimit, setCurrentLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const { executeFilter, setExecuteFilter } = executeFilterState

  useEffect(() => {
    // esta longitud y latitud debe cambiarse por la que envie el mapa
    getEvents(`${API_URL}?lat=-34.60448395867932&lon=-58.38164429855504`).then(data => {
      setEventsList(data)
      setEventsListFiltered(data)
    })
  }, [])

  useEffect(() => {
    if (!executeFilter) return
    const filteredList = eventsList.filter((event) => {
    return filtersForEvents.every(({ property, filterValue }) => {
      if (property === "type")
        return filterValue === FILTER_BY_TYPE_LIST[0].value
          ? true
          : event?.type === filterValue;
      if (property === "date")
        return filterValue ? filterDateTo(event?.date, filterValue) : true;
      });
    })
    setExecuteFilter(false)
    setEventsListFiltered(filteredList)
  }, [executeFilter]);

  const lastCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(false)
    if (currentLimit >= EVENTS_LIST.length) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsLoading(true)
        setCurrentLimit(prev => prev + 10)
      }
    }, { threshold: 1 })
    if (lastCardRef.current) observer.observe(lastCardRef.current)
    return () => observer.disconnect()
  }, [currentLimit, lastCardRef])

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 mb-6">
        {
          eventsListFiltered.length > 0
            ? eventsListFiltered.map((event, index) => (
              <Link key={event.id} href={`/events/${event.id}`}>
                <CardEventList event={event} lastCardRef={index + 1 === currentLimit ? lastCardRef : null} />
              </Link>
            ))
            : <span className="text-gray-500 text-center">No se encontraron eventos</span>
        }
      </div>
      {
        isLoading && <div className="spinner"></div>
      }
    </div>
  )
}