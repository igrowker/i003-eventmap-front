'use client'
import { useState } from "react"
import { OPTION_DAYS } from "@/constants/events-list-resources"
import { OptionDaysType } from "@/types/events-list-types"

export default function OptionDays({ setFilters }: { setFilters: (filter: any) => void }) {
  const [optionSelected, setOptionSelected] = useState<OptionDaysType>(OPTION_DAYS[0].value)

  const handleSelectOptionDay = (value: OptionDaysType) => {
    setOptionSelected(value)
    // @ts-ignore
    setFilters(prev => {
      if (prev == null) return [{ property: 'date', filterValue: value }]
      // @ts-ignore
      return [...prev.filter(({ property }) => property !== 'date'), { property: 'date', filterValue: value }]
    })
  }

  return (
    <div className="w-full flex gap-2">
      {
        OPTION_DAYS.map(({ label, value }) => (
          <button key={value} onClick={() => handleSelectOptionDay(value)} className={`${optionSelected === value ? 'bg-dark text-light' : ''} w-fit sm:h-[30px] py-1 px-4 border border-dark rounded-full text-sm ring-dark ring-offset-2 hover:ring-2 transition duration-300 ease-out`}>{label}</button>
        ))
      }
    </div>
  )
}