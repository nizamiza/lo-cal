import { usePreference } from "@/contexts/Preferences";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export function getWeekDay(date: Date) {
  return WEEK_DAYS[date.getDay()];
}

export default function useWeekDays() {
  const [firstDayOfWeek] = usePreference("first-day-of-week");

  return WEEK_DAYS.slice(firstDayOfWeek).concat(
    WEEK_DAYS.slice(0, firstDayOfWeek)
  );
}
