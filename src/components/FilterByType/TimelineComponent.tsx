import { FilterByDateProps } from "@/types/filter-types";
import { handleSelectFilter } from "@/utils/handleSelectFilter";
import { useState } from "react";
import CalendarDateSelector from "../Global/CalendarDateSelector";

export default function TimelineComponent({ onDateRangeChange, filterValueState, setIsFilterMenuOpen }: FilterByDateProps) {
  const { filterValues, setFilterValues } = filterValueState

  return (
    <div className="flex flex-col gap-1">
      {/* @ts-ignore */}
      <CalendarDateSelector handleChange={(e) => handleSelectFilter(e, filterValues, setFilterValues, setIsFilterMenuOpen)} filters={filterValues} section="filter" />
    </div>
  )
}