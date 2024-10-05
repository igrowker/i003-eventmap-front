export const FILTER_BY_TYPE_LIST = [
{ label: 'Todos', value: 'all' },
{ label: 'Artístico', value: 'Artístico' },
{ label: 'Gastronómico', value: 'Gastronómico' },
{ label: 'Deportivo', value: 'Deportivo' }
] as const

export const INITIAL_FILTER_VALUES = {
  type: FILTER_BY_TYPE_LIST[0].value,
  date: '0' as `${number}`
}

export const MAX_RANGE_DAYS_MS = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds