export function isPastCalendarDate(
  year: number,
  month: number,
  dayNum: number,
  referenceDate: Date = new Date()
): boolean {
  const refYear = referenceDate.getFullYear();
  const refMonth = referenceDate.getMonth();
  const refDay = referenceDate.getDate();

  if (year < refYear) return true;
  if (year > refYear) return false;
  if (month < refMonth) return true;
  if (month > refMonth) return false;
  return dayNum < refDay;
}

export function canNavigateToPrevMonth(
  year: number,
  month: number,
  referenceDate: Date = new Date()
): boolean {
  const refYear = referenceDate.getFullYear();
  const refMonth = referenceDate.getMonth();
  return year > refYear || (year === refYear && month > refMonth);
}
