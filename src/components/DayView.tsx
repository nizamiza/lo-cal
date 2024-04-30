import { useMemo } from "react";
import CalendarDay from "@/components/CalendarDay";
import useCalendarViewModel from "@/hooks/useCalendarViewModel";
import { cn } from "@/shared/utils";

export default function DayView() {
  const [{ date }, getEventsOnDate] = useCalendarViewModel();

  const events = useMemo(() => getEventsOnDate(date), [date, getEventsOnDate]);

  return (
    <div
      className={cn(
        "grid gap-4 min-h-[--day-min-height] max-w-[min(90vw,60ch)] w-full",
        "mx-auto"
      )}
    >
      <CalendarDay
        className="aspect-auto h-auto rounded-md sm:rounded-xl"
        date={date}
        events={events}
      />
    </div>
  );
}
