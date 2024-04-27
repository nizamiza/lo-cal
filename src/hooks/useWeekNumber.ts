function getWeekNumber(date: Date | string) {
  // Copy date so don't modify original
  const dateCopy = new Date(date);
  dateCopy.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  dateCopy.setDate(dateCopy.getDate() + 4 - (dateCopy.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(dateCopy.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((dateCopy - yearStart) / 86400000 + 1) / 7);
}

export default function useWeekNumber(date: Date) {
  return getWeekNumber(date);
}
