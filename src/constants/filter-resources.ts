export const FILTER_BY_TYPE_LIST = [
{ label: 'todos', value: 'all' },
{ label: 'recital', value: 'show' },
{ label: 'partido', value: 'match' },
{ label: 'teatro', value: 'theater' }
] as const

export const INITIAL_FILTER_VALUES = {
  type: FILTER_BY_TYPE_LIST[0].value,
  date: '0' as `${number}`
}