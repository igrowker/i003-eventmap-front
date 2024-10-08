'use client'
import { useState } from "react";
import ContainerEventList from "./ContainerEventList";
import OptionDays from "./OptionDays";
import SelectFilterByType from "./SelectFilterByType";
import { eventTypes } from "@/types/events-list-types";
import { BiArrowBack } from "react-icons/bi";
import { Filters, FilterValues } from "@/types/filter-types";
import Link from "next/link";

export default function EventListComponent() {
  // Hasta que no se use estados globales, usamos esta forma para manejar el estado de los filtros
  const [filters, setFilters] = useState<Filters[] | []>([])
  const [executeFilter, setExecuteFilter] = useState<boolean>(false)
  return (
    <div className="max-w-[1000px] w-full flex flex-col gap-4 px-8 mx-auto my-6">
      <div className="flex gap-2 items-center">
        <Link href="./"><BiArrowBack width={20} height={20} /></Link>
        <h1 className="text-2xl font-semibold">En mi ubicación actual</h1>
      </div>
      <div className="flex flex-col gap-4">
        <SelectFilterByType setFilters={setFilters} />
        <OptionDays filtersState={{ filters, setFilters }} />
        <button onClick={() => setExecuteFilter(true)} className="w-full bg-createEventButton text-white py-2 rounded-full">Buscar</button>
      </div>
      <ContainerEventList filtersForEvents={filters} executeFilterState={{ executeFilter, setExecuteFilter }} />
    </div>
  )
}