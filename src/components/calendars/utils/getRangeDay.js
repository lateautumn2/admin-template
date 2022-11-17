import { parseTime } from './formatTime'

export function getRangeDay(startDate, endDate) {
  const result = []
  const db = new Date()
  db.setUTCFullYear(startDate.year, startDate.month - 1, startDate.day)
  const de = new Date()
  de.setUTCFullYear(endDate.year, endDate.month - 1, endDate.day)
  let smallDate
  let bigDate
  if (db.getTime() > de.getTime()) {
    smallDate = de.getTime()
    bigDate = db.getTime()
  } else {
    smallDate = db.getTime()
    bigDate = de.getTime()
  }
  for (let k = smallDate; k <= bigDate; ) {
    result.push({
      year: parseTime(k, '{y}'),
      month: parseTime(k, '{m}').length === 1 ? '0' + parseTime(k, '{m}') : parseTime(k, '{m}'),
      day: parseTime(k, '{d}').length === 1 ? '0' + parseTime(k, '{d}') : parseTime(k, '{d}'),
      checked: true
    })
    k = k + 24 * 60 * 60 * 1000
  }
  return result
}
