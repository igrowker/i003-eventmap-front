"use client"
import { useEffect, useState } from "react"
import { FILTER_BY_TYPE_LIST, INITIAL_FILTER_VALUES } from "@/constants/filter-resources"
import { FilterComponentProps, FiltersState, type FilterValues } from "@/types/filter-types"
import FilterByType from "./FilterByType"
import TimelineComponent from "./TimelineComponent"
import useMapStore from '@/store/mapStore'


export default function FilterComponent({ onFilterChange }: FilterComponentProps) {
  const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  const { storeFilterValues, setStoreFilterValues } = useMapStore();


  useEffect(() => {
    
    if (storeFilterValues.date === "") {
      setStoreFilterValues({ ...storeFilterValues, date: "0" });
    }
  }, [storeFilterValues.date, setStoreFilterValues, storeFilterValues]);

  
  useEffect(() => {
    setStoreFilterValues(filterValues);
  }, [filterValues, setStoreFilterValues]);



  return (
    <div className="z-[8888]">
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="flex gap-2 items-center bg-createEventButton py-2 px-4 rounded-lg sm:hidden max-sm:self-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#ffffff" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <span className="text-light text-sm">Filtrar</span>
        </button>
        <div className={`${!isFilterMenuOpen ? 'max-sm:hidden' : ''} relative max-sm:border max-sm:border-dark max-sm:border-opacity-20 max-sm:rounded-lg max-sm:p-2 flex max-sm:flex-col-reverse items-center gap-4`}>
          {/* @ts-ignore */}
          <TimelineComponent filterValueState={{ filterValues, setFilterValues }} setIsFilterMenuOpen={setIsFilterMenuOpen} />
          {/* @ts-ignore */}
          <FilterByType onFilterChange={onFilterChange} filterByTypeList={FILTER_BY_TYPE_LIST} filterValueState={{ filterValues, setFilterValues }} setIsFilterMenuOpen={setIsFilterMenuOpen} />
        </div>
      </div>
    </div>
  )
}