'use client'

import { Suspense, useEffect, useState } from "react";
import ContainerEventList from "./ContainerEventList";
import OptionDays from "./OptionDays";
import SelectFilterByType from "./SelectFilterByType";
import { useSearchParams } from 'next/navigation';
import { Filters } from "@/types/filter-types";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { FILTER_BY_TYPE_LIST } from "../../constants/filter-resources";
import { FaSearch } from "react-icons/fa";
import { SearchParamsComponentProps } from "../../types/events-list-types";

export default function EventListComponent() {
  // Hasta que no se use estados globales, usamos esta forma para manejar el estado de los filtros
  const [filters, setFilters] = useState<Filters[] | []>([]);
  const [executeFilter, setExecuteFilter] = useState<boolean>(false);

  return (
    <div className="max-w-[1000px] w-full flex flex-col gap-4 px-4 sm:px-8 mx-auto my-6">
      <div className="flex gap-2 items-center">
        <Link href="./"><BiArrowBack width={20} height={20} /></Link>
        <h1 className="text-2xl font-semibold">En mi ubicación actual</h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsComponent 
          filters={filters} 
          setFilters={setFilters} 
          executeFilter={executeFilter} 
          setExecuteFilter={setExecuteFilter} 
        />
      </Suspense>
    </div>
  );
}

//busco en params
function SearchParamsComponent({ filters, setFilters, executeFilter, setExecuteFilter }: SearchParamsComponentProps) {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');

  useEffect(() => {
    const foundFilter = FILTER_BY_TYPE_LIST.find(
      (filter) => filter.value === typeFilter
    );

    if (foundFilter) {
      setFilters([{ property: 'type', filterValue: foundFilter.value as Filters['filterValue'] }]);
      setExecuteFilter(true);
    }
  }, [typeFilter]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <SelectFilterByType setFilters={setFilters} />
        <OptionDays filtersState={{ filters, setFilters }} />
        <button onClick={() => setExecuteFilter(true)} className="w-full flex gap-2 items-center justify-center bg-createEventButton text-white py-2 rounded-full">
          <FaSearch />
          <span className="font-semibold">Buscar</span>
        </button>
      </div>
      {
        typeFilter ? (
          <ContainerEventList filtersForEvents={filters} executeFilterState={{ executeFilter, setExecuteFilter }} typeFilter={typeFilter}/>
        ) : (
          <ContainerEventList filtersForEvents={filters} executeFilterState={{ executeFilter, setExecuteFilter }}/>
        )
      }
    </>
  );
}
