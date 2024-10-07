'use client'
import { useState } from "react"
import { OPTION_DAYS } from "@/constants/events-list-resources"
import { OptionDaysType } from "@/types/events-list-types"
import CalendarDateSelector from "../Global/CalendarDateSelector"
import { FiltersState } from "@/types/filter-types"

export default function OptionDays({ filtersState }: { filtersState: FiltersState }) {
  const [optionSelected, setOptionSelected] = useState<OptionDaysType>(OPTION_DAYS[0].value)
  const [dateTo, setDateTo] = useState<string>('')
  const { filters, setFilters } = filtersState

  const handleSelectDayTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const dateInMs = value !== '' ? new Date(value).getTime() : null
    // @ts-ignore
    setFilters(prev => {
      if (prev == null) return [{ property: 'date', filterValue: dateInMs }]
      // @ts-ignore
      return [...prev.filter(({ property }) => property !== 'date'), { property: 'date', filterValue: dateInMs }]
    })
  }

  return (
    <div className="w-full flex gap-2">
      <CalendarDateSelector handleChange={handleSelectDayTo} filters={filters} />
    </div>
  )
}