'use client'
import { useState } from "react";
import ContainerEventList from "./ContainerEventList";
import OptionDays from "./OptionDays";
import SelectFilterByType from "./SelectFilterByType";
import { eventTypes } from "@/types/events-list-types";

export default function EventListComponent() {
  // Hasta que no se use estados globales, usamos esta forma para manejar el estado de los filtros
  const [filters, setFilters] = useState<{ property: keyof eventTypes, filterValue: string }[]>([])
  return (
    <div className="max-w-[1000px] w-full flex flex-col gap-4 px-8 mx-auto my-6">
      <h1 className="text-2xl font-semibold">En mi ubicación actual</h1>
      <div className="flex flex-col gap-4">
        <SelectFilterByType setFilters={setFilters} />
        <OptionDays setFilters={setFilters} />
      </div>
      <ContainerEventList filtersForEvents={filters} />
    </div>
  )
}