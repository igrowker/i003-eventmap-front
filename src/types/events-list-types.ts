import { OPTION_DAYS } from "@/constants/events-list-resources";

export type OptionDaysType = typeof OPTION_DAYS[number]['value']
export interface eventTypes {
  id: number,
  name: string,
  date: string,
  location: string
  type: string;
  img: string;
}