import { useMemo } from "react";
import CalendarDay from "@/components/CalendarDay";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";

export default function DayView() {
  const [{ date }, getEventsOnDate] = useCalendarViewModel();

  const events = useMemo(() => getEventsOnDate(date), [date, getEventsOnDate]);

  return (
    <div className="grid gap-4 min-h-[--day-min-height] max-w-2xl w-full mx-auto">
      <CalendarDay
        className="aspect-auto rounded-md sm:rounded-xl"
        date={date}
        events={events}
      />
    </div>
  );
}
