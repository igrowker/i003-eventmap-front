import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";

export type FilterByType = typeof FILTER_BY_TYPE_LIST[number]['value']
export type FilterByDate = `${number}`
export interface FilterValues { type: FilterByType, date: FilterByDate }
export type FilterComponentProps = { onFilterChange?: () => void }
export type FilterByTypeProps = { onFilterChange?: () => void, filterByTypeList: typeof FILTER_BY_TYPE_LIST, filterValueState: { filterValues: FilterValues, setFilterValues: (value: FilterValues) => void }, setIsFilterMenuOpen: (value: boolean) => void }
export type FilterByDateProps = { onDateRangeChange?: () => void, filterValueState: { filterValues: FilterValues, setFilterValues: (value: FilterValues) => void }, setIsFilterMenuOpen: (value: boolean) => void }