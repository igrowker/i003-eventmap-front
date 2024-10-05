'use client'
import { useState } from "react";
import ContainerEventList from "./ContainerEventList";
import OptionDays from "./OptionDays";
import SelectFilterByType from "./SelectFilterByType";
import { eventTypes } from "@/types/events-list-types";
import { BiArrowBack } from "react-icons/bi";
import { Filters, FilterValues } from "@/types/filter-types";

export default function EventListComponent() {
  // Hasta que no se use estados globales, usamos esta forma para manejar el estado de los filtros
  const [filters, setFilters] = useState<Filters | []>([])
  return (
    <div className="max-w-[1000px] w-full flex flex-col gap-4 px-8 mx-auto my-6">
      <div className="flex gap-2 items-center">
        <a href="./"><BiArrowBack width={20} height={20} /></a>
        <h1 className="text-2xl font-semibold">En mi ubicación actual</h1>
      </div>
      <div className="flex flex-col gap-4">
        <SelectFilterByType setFilters={setFilters} />
        <OptionDays filtersState={{ filters, setFilters }} />
      </div>
      <ContainerEventList filtersForEvents={filters} />
    </div>
  )
}