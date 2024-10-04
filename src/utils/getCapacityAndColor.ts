export const getCapacityAndColor = (capacity: string) => {
  if (capacity === 'Menos de 500') return { color: 'text-normal', capacity: 'Normal' }
  if (capacity === 'Entre 500 y 2000') return { color: 'text-medium', capacity: 'Media' }
  if (capacity === 'Entre 2000 y 5000') return { color: 'text-high', capacity: 'Alta' }
  if (capacity === 'Más de 5000') return { color: 'text-massive', capacity: 'Masiva' }
  return { color: 'text-gray-500', capacity: 'Sin especificar' }
}