import { OPTION_DAYS } from "@/constants/events-list-resources";
import { Filters } from "./filter-types";
import { Dispatch, SetStateAction } from "react";

export type OptionDaysType = typeof OPTION_DAYS[number]['value']
export interface eventTypes {
  id: number,
  name: string,
  date: string,
  location: { lat: string, lon: string },
  time: string,
  photos: string[],
  description: string,
  amount: number,
  createdAt: string,
  userId: number,
  type: string;
  capacity: string;
  addres: string;
}

export interface SearchParamsComponentProps {
  filters: Filters[];
  setFilters: Dispatch<SetStateAction<Filters[]>>;
  executeFilter: boolean;
  setExecuteFilter: Dispatch<SetStateAction<boolean>>;
}