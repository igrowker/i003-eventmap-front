export const getEventTimeFormatted = (dateToFormat: string) => {
  const date = new Date(dateToFormat)
  const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' } as const
  return date.toLocaleDateString('es-ES', options)
}