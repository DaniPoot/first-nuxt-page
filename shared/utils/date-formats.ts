export const dayMonthYearFormath = (date: Date) => {
  return date.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

export const longDateTimeFormat = (value: string | Date) => {
  const dateInstance = value instanceof Date ? value : new Date(value)

  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short',
    hour12: true
  }).format(dateInstance)
}