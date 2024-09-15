import { EVENTS_LIST } from "@/mocks/events-list-mock";
import CardEventList from "./CardEventList";
import { eventTypes } from "@/types/events-list-types";
import { getDateByFilterDate } from "@/utils/getDateByFilterDate";
import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";

export default function ContainerEventList({ filtersForEvents = [] }: { filtersForEvents: { property: keyof eventTypes, filterValue: string }[] }) {
  const filterBy = (event: eventTypes) => filtersForEvents?.every(({ property, filterValue }) => {
    if (property === 'type') return filterValue === FILTER_BY_TYPE_LIST[0].value ? true : event?.type === filterValue 
    if (property === 'date') return getDateByFilterDate(event?.date, filterValue)
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {
        (
          filtersForEvents?.length > 0
            ? EVENTS_LIST.filter(event => filterBy(event))
            : EVENTS_LIST
        ).map(event => (
          <CardEventList key={event.id} event={event} />
        ))
      }
    </div>
  )
}