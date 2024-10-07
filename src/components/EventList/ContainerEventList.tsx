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
  const API_URL = 'https://i003-eventmap-back.onrender.com/events'
  const [eventsList, setEventsList] = useState<eventTypes[]>(EVENTS_LIST) // El "EVENTS_LIST" es un mock de eventos temporal, hasta que cargue el backend
  const [eventsListFiltered, setEventsListFiltered] = useState<eventTypes[]>(EVENTS_LIST)
  const [currentLimit, setCurrentLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const { executeFilter, setExecuteFilter } = executeFilterState

  useEffect(() => {
    getEvents(`${API_URL}?lat=-34.12&lon=-45.32`).then(data => {
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
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {
          eventsListFiltered.map((event, index) => (
            <Link key={event.id} href={`/event/${event.id}`}>
              <CardEventList event={event} lastCardRef={index + 1 === currentLimit ? lastCardRef : null} />
            </Link>
          ))
        }
      </div>
      {
        isLoading && <div className="spinner"></div>
      }
    </div>
  )
}