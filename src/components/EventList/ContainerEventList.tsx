import { EVENTS_LIST } from "@/mocks/events-list-mock";
import CardEventList from "./CardEventList";
import { eventTypes } from "@/types/events-list-types";
import { filterDateTo, getDateByFilterDate } from "@/utils/getDateByFilterDate";
import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";
import { useEffect, useRef, useState } from "react";
import { Filters } from "@/types/filter-types";

export default function ContainerEventList({ filtersForEvents = [] }: { filtersForEvents: Filters | [] }) {
  const [currentLimit, setCurrentLimit] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  // @ts-ignore
  const filterBy = (event: eventTypes) => filtersForEvents?.every(({ property, filterValue }) => {
    if (property === 'type') return filterValue === FILTER_BY_TYPE_LIST[0].value ? true : event?.type === filterValue 
    if (property === 'date') return filterValue ? filterDateTo(event?.date, filterValue) : true
  })
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
        {
          (
            filtersForEvents?.length > 0
              ? EVENTS_LIST.slice(0, currentLimit).filter(event => filterBy(event))
              : EVENTS_LIST.slice(0, currentLimit)
          ).map((event, index) => (
            <CardEventList key={event.id} event={event} lastCardRef={index + 1 === currentLimit ? lastCardRef : null} />
          ))
        }
      </div>
      {
        isLoading && <div className="spinner"></div>
      }
    </div>
  )
}