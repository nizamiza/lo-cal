import { useMemo } from "react";
import WeekDaysHeader from "@/components/WeekDaysHeader";
import CalendarDay from "@/components/CalendarDay";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";
import useAlignedEventDates from "@/hooks/useAlignedEventDates";

export default function MonthView() {
  const [{ date, year }] = useCalendarViewModel();

  const eventDates = useAlignedEventDates(
    7 * 5,
    new Date(year, date.getMonth(), 1)
  );

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
