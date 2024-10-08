import { OPTION_DAYS } from "@/constants/events-list-resources"

export const getDateByFilterDate = (eventValue: string, filterDateValue: string): boolean => {
  if (filterDateValue === OPTION_DAYS[1].value) return eventValue === new Date().toISOString().split('T')[0]
  else if (filterDateValue === OPTION_DAYS[2].value) {
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
    return eventValue === tomorrow.toISOString().split('T')[0]
  } else if (filterDateValue === OPTION_DAYS[3].value) {
    const nextDayOfTomorrow = new Date(new Date().setDate(new Date().getDate() + 2))
    return new Date(eventValue) >= new Date(nextDayOfTomorrow.toISOString().split('T')[0])
  } else return true
}

export const filterDateTo = (eventValue: string, filterDateValue: string): boolean => {
  const eventDateInMs = new Date(eventValue).getTime()
  return Number(eventDateInMs) <= Number(filterDateValue)
}
