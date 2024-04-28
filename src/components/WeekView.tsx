import WeekDaysHeader from "@/components/WeekDaysHeader";
import useWeekDays, { getWeekDay } from "@/hooks/useWeekDays";
import CalendarDay from "@/components/CalendarDay";
import useWeekNumber from "@/hooks/useWeekNumber";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";

export default function WeekView() {
  const [{ date, year, month }, getEventsOnDate] = useCalendarViewModel();
  const weekDays = useWeekDays();

  const daysToFirstDayOfWeek = weekDays.indexOf(getWeekDay(date));
  const weekNumber = useWeekNumber(date);

  const eventDates = useMemo(() => {
    return Array.from({ length: weekDays.length }, (_, i) => {
      const date = new Date(
        year,
        currentMonth,
        currentDate.getDate() - daysToFirstDayOfWeek + i
      );

      const eventsOnDate = getEventsOnDate(date);

      return {
        date,
        events: eventsOnDate,
      };
    });
  }, [year, month, daysToFirstDayOfWeek, getEventsOnDate]);

  return (
    <div className="grid gap-4">
      <WeekDaysHeader />
      <section className="grid min-h-[--day-min-height]">
        <h2 className="sr-only">Week {weekNumber}</h2>
        <ol className="grid grid-cols-7 gap-1 sm:gap-2">
          {eventDates.map(({ date, events }) => (
            <li key={`week-view-${date.toISOString()}`}>
              <CalendarDay
                className="aspect-auto"
                date={date}
                events={events}
              />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
