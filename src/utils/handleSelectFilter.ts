import { FilterByType, FilterValues, FilterByDate } from "@/types/filter-types"

export const handleSelectFilter = (
  e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>,
  filterValues: FilterValues,
  setFilterValue: (value: FilterValues) => void, 
  setIsFilterMenuOpen: (value: boolean) => void
) => {
  const filterBy = e.currentTarget.name as keyof FilterValues
  const filterValue = e.currentTarget.value as FilterByType | FilterByDate
  if (filterValues[filterBy] !== filterValue) {
    // @ts-ignore
    setFilterValue({ ...filterValues, [filterBy]: filterValue })
    // @ts-ignore
    if (filterBy === 'type') setIsFilterMenuOpen((prev: boolean) => prev && false)
    // @ts-ignore
  } else if (filterBy === 'type')setIsFilterMenuOpen((prev: boolean) => !prev)
}
