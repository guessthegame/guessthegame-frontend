const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = hour * 24

export function durationToString(durationInMs: number): string {
  const days = Math.floor(durationInMs / day)
  let reminder = durationInMs - days * day
  const hours = Math.floor(reminder / hour)
  reminder = reminder - hours * hour
  const minutes = Math.floor(reminder / minute)
  reminder = reminder - minutes * minute
  const seconds = Math.floor(reminder / second)

  return (
    (days > 0 ? `${days}j, ` : '') +
    (hours > 0 ? `${hours}h, ` : '') +
    (minutes > 0 ? `${minutes}m, ` : '') +
    `${seconds}s`
  )
}

export function displayDateTime(date?: null | string | Date): string {
  if (!date) {
    return '?'
  }
  if (typeof date === 'string') {
    return new Date(date).toLocaleString()
  }
  return date.toLocaleString()
}

export function displayDate(date?: null | string | Date): string {
  if (!date) {
    return '?'
  }
  if (typeof date === 'string') {
    return new Date(date).toLocaleDateString()
  }
  return date.toLocaleDateString()
}
