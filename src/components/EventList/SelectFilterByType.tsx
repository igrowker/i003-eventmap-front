'use client'
import { useState } from "react";
import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";
import { FilterByType } from "@/types/filter-types";

export default function SelectFilterByType({ setFilters }: { setFilters: (filter: any) => void }) {
  const [filterValues, setFilterValues] = useState<FilterByType>()

  const handleSelectFilterByType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as FilterByType
    setFilterValues(value)
    // @ts-ignore
    setFilters(prev => {
      if (prev == null) return [{ property: 'type', filterValue: value }]
      // @ts-ignore
      return [...prev.filter(({ property }) => property !== 'type'), { property: 'type', filterValue: value }]
    })
  }

  return (
    <div className="w-full">
      <select onChange={handleSelectFilterByType} name="select-filter-type" className="w-full border py-2 px-4 rounded-full">
        {
          FILTER_BY_TYPE_LIST.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          ))
        }
      </select>
    </div>
  )
}