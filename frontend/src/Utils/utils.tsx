/**
 * Time to minutes.
 *
 * @param   {number} whatsit  The whatsit to use (or whatever).
 * @returns {string} A useful value.
 */
export const timeToMinutes = (time: string) => {
  return +time.substring(0, 2) * 60 + +time.substring(3, 5)
}
/**
 * Minutes to time.
 *
 * @param   {number} whatsit  The whatsit to use (or whatever).
 * @returns {string} A useful value.
 */
export const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const min = minutes % 60
  return `${String(hours).padStart(2, '0')}:${String(min).padStart(2, '0')}`
}
