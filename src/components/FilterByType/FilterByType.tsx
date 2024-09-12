"use client"
import { useState } from "react"
import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources"
import { type FilterValues } from "@/types/filter-types"
import { handleSelectFilter } from "@/utils/handleSelectFilter"


export default function FilterByType() {
  const [filterValue, setFilterValue] = useState<FilterValues>(FILTER_BY_TYPE_LIST[0].value)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false)

  return (
    <div>
      <h1 className="my-4">Filter</h1>
      <div className="relative">
        <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
        </button>
        <div className={`${!isFilterMenuOpen ? 'max-sm:hidden' : ''} max-sm:absolute top-8 left-2 max-sm:border max-sm:overflow-hidden max-sm:rounded-lg flex max-sm:flex-col sm:gap-4 max-sm:divide-y max-sm:divide-gray-400 max-sm:[&>button]:py-2`}>
          {
            FILTER_BY_TYPE_LIST.map(({ label, value }) => (
              <button key={value} onClick={(e) => handleSelectFilter(e, setFilterValue, setIsFilterMenuOpen)} value={value} className={`${filterValue === value ? 'bg-light text-dark' : ''} sm:py-1 w-full sm:w-fit px-4 sm:text-center sm:border sm:rounded-full text-sm capitalize max-sm:hover:bg-light/20`}>{label}</button>
            ))
          }
        </div>
      </div>
    </div>
  )
}