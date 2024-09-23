import { FilterValues } from "@/types/filter-types"

export const handleSelectFilter = (e: React.MouseEvent<HTMLButtonElement>, setFilterValue: React.Dispatch<React.SetStateAction<FilterValues>>, setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
  const filter = e.currentTarget.value as FilterValues
  setFilterValue(filter)
  setIsFilterMenuOpen(prevState => prevState && false)
}