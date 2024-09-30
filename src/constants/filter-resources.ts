export const FILTER_BY_TYPE_LIST = [
{ label: 'Todos', value: 'all' },
{ label: 'Recital', value: 'show' },
{ label: 'Partido', value: 'match' },
{ label: 'Teatro', value: 'theater' }
] as const

export const INITIAL_FILTER_VALUES = {
  type: FILTER_BY_TYPE_LIST[0].value,
  date: '0' as `${number}`
}