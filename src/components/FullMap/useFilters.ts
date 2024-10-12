"use client"

import { INITIAL_FILTER_VALUES } from "@/constants/filter-resources";

import { useState } from "react";

export function useFilters(){
  const [filterValues, setFilterValues] = useState(INITIAL_FILTER_VALUES);

  return {
    filterValues,
    setFilterValues
  }

}