export const dayMonthYearFormath = (date: Date) => {
  return date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}