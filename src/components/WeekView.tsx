import WeekDaysHeader from "@/components/WeekDaysHeader";
import CalendarDay from "@/components/CalendarDay";
import useAlignedEventDates from "@/hooks/useAlignedEventDates";
import useWeekNumber from "@/hooks/useWeekNumber";
import { cn } from "@/shared/utils";

export default function WeekView() {
  const eventDates = useAlignedEventDates(7);
  const weekNumber = useWeekNumber(eventDates[0].date);

  return (
    <div className="grid gap-4">
      <WeekDaysHeader
        listClassName={cn(
          "grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)]",
          "md:grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr]"
        )}
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
