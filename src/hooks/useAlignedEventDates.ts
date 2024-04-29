import { useMemo } from "react";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";
import useWeekDays, { getWeekDay } from "@/hooks/useWeekDays";

export default function useAlignedEventDates(
  dateCount: number,
  startDate?: Date
) {
  const [currentDateInfo, getEventsOnDate] = useCalendarViewModel();
  const resolvedDate = startDate || currentDateInfo.date;

  const weekDays = useWeekDays();
  const daysToFirstDayOfWeek = weekDays.indexOf(getWeekDay(resolvedDate));

  const eventDates = useMemo(() => {
    const { date, year, month } = startDate
      ? {
          date: startDate,
          year: startDate.getFullYear(),
          month: startDate.getMonth(),
        }
      : currentDateInfo;

    return Array.from({ length: dateCount }, (_, i) => {
      const eventDate = new Date(
        year,
        month,
        date.getDate() - daysToFirstDayOfWeek + i
      );

      const eventsOnDate = getEventsOnDate(eventDate);

      return {
        date: eventDate,
        events: eventsOnDate,
      };
    });
  }, [
    startDate,
    daysToFirstDayOfWeek,
    getEventsOnDate,
    dateCount,
    currentDateInfo,
  ]);

  return eventDates;
}
