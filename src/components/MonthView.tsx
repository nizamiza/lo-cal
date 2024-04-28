import { useMemo } from "react";
import WeekDaysHeader from "@/components/WeekDaysHeader";
import CalendarDay from "@/components/CalendarDay";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export default function MonthView() {
  const [{ date, year, month }, getEventsOnDate] = useCalendarViewModel();

  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);

  const eventDates = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      const eventsOnDate = getEventsOnDate(date);

      return {
        date,
        events: eventsOnDate,
      };
    });
  }, [year, month, daysInMonth, getEventsOnDate]);

  const heading = useMemo(
    () =>
      `Days of ${Intl.DateTimeFormat("en-US", { month: "long" }).format(date)} ${year}`,
    [date, year]
  );

  return (
    <div className="grid gap-4">
      <WeekDaysHeader />
      <section>
        <h2 className="sr-only">{heading}</h2>
        <ol className="grid grid-cols-7 gap-1 sm:gap-2">
          {eventDates.map(({ date, events }) => (
            <li key={`month-view-${date.toISOString()}`}>
              <CalendarDay date={date} events={events} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
