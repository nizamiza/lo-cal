import { useMemo } from "react";
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
      const eventDate = new Date(
        year,
        month,
        date.getDate() - daysToFirstDayOfWeek + i,
      );

      const eventsOnDate = getEventsOnDate(eventDate);

      return {
        date: eventDate,
        events: eventsOnDate,
      };
    });
  }, [year, month, daysToFirstDayOfWeek, getEventsOnDate, date, weekDays]);

  return (
    <div className="grid gap-4">
      <WeekDaysHeader
        listClassName={`
          grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)]
          md:grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr]
        `}
        separatorClassName="[&:nth-of-type(4)]:opacity-0 md:[&:nth-of-type(4)]:opacity-1"
      />
      <section className="grid md:min-h-[--day-min-height]">
        <h2 className="sr-only">Week {weekNumber}</h2>
        <ol className="grid grid-cols-4 md:grid-cols-7 gap-1 sm:gap-2">
          {eventDates.map(({ date, events }) => (
            <li key={`week-view-${date.toISOString()}`}>
              <CalendarDay
                className="md:aspect-auto"
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
