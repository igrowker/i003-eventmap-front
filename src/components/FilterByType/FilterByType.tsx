import { FilterByTypeProps } from "@/types/filter-types";
import { handleSelectFilter } from "@/utils/handleSelectFilter";

export default function FilterByType({ filterByTypeList, filterValueState, setIsFilterMenuOpen }: FilterByTypeProps) {
  const { filterValues, setFilterValues } = filterValueState

  return (
    <div className="w-full max-sm:border max-sm:overflow-hidden max-sm:rounded-lg flex max-sm:flex-col sm:gap-4 max-sm:divide-y max-sm:divide-gray-400 max-sm:[&>button]:py-2">
      {
        filterByTypeList.map(({ label, value }) => (
          <button key={value} onClick={(e) => handleSelectFilter(e, filterValues, setFilterValues, setIsFilterMenuOpen)} name='type' value={value} className={`${filterValues?.type === value ? 'bg-dark text-light' : ''} sm:py-1 w-full sm:w-fit sm:h-[30px] px-4 sm:text-center sm:border border-dark sm:rounded-full text-sm capitalize max-sm:hover:bg-dark/20 sm:ring-dark sm:ring-offset-2 hover:sm:ring-2 transition duration-300 ease-out`}>{label}</button>
        ))
      }
    </div>
  )
}