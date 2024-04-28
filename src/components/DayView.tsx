import { useMemo } from "react";
import CalendarDay from "@/components/CalendarDay";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";

export default function DayView() {
  const [{ date, year, month }, getEventsOnDate] = useCalendarViewModel();

  const events = useMemo(() => getEventsOnDate(date), [date, getEventsOnDate]);

  return (
    <div className="grid gap-4 min-h-[--day-min-height]">
      <CalendarDay className="aspect-auto h-full" date={date} events={events} />
    </div>
  );
}
