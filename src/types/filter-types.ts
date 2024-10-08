import { FILTER_BY_TYPE_LIST } from "@/constants/filter-resources";

export type FilterByType = typeof FILTER_BY_TYPE_LIST[number]['value']
export type FilterByDate = `${number}`
export type Filters = { filterValue: FilterByType | FilterByDate, property: 'type' | 'date' }
export type FilterValues = { filterValues: Filters, setFilterValues: (value: Filters) => void }
export type FilterComponentProps = { onFilterChange?: () => void }
export type FilterByTypeProps = { onFilterChange?: () => void, filterByTypeList: typeof FILTER_BY_TYPE_LIST, filterValueState: { filterValues: FilterValues, setFilterValues: (value: FilterValues) => void }, setIsFilterMenuOpen: (value: boolean) => void }
export type FilterByTypeList = { type: FilterByType, date: FilterByDate }
export type FilterByDateProps = { onDateRangeChange?: () => void, filterValueState: { filterValues: FilterByTypeList, setFilterValues: (value: Filters[]) => void }, setIsFilterMenuOpen: (value: boolean) => void }
export type FiltersState = { filters: Filters[] | [], setFilters: (value: Filters[]) => void }