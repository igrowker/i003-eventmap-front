import { FilterByDateProps } from "@/types/filter-types";
import { handleSelectFilter } from "@/utils/handleSelectFilter";
import { useState } from "react";

export default function TimelineComponent({ onDateRangeChange, filterValueState, setIsFilterMenuOpen }: FilterByDateProps) {
  const { filterValues, setFilterValues } = filterValueState

  return (
    <div className="flex flex-col gap-1">
      <small><strong>{filterValues?.date}</strong> Días</small>
      <input onChange={(e) => handleSelectFilter(e, filterValues, setFilterValues, setIsFilterMenuOpen)} type="range" className="accent-dark" name="date" value={filterValues?.date} max={7} min={0}  />
    </div>
  )
}