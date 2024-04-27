import { usePreference } from "@/contexts/Preferences";
import WeekDaysHeader from "@/components/WeekDaysHeader";
import useWeekDays, { getWeekDay } from "@/hooks/useWeekDays";
import EventDayListItem from "@/components/EventDayListItem";
import useWeekNumber from "@/hooks/useWeekNumber";

export default function WeekView() {
  const [lastViewedDate] = usePreference("last-viewed-date");
  const [firstDayOfWeek] = usePreference("first-day-of-week");
  const weekDays = useWeekDays();

  const currentDate = new Date(lastViewedDate);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysToFrstDayOfWeek = weekDays.indexOf(getWeekDay(currentDate));
  const weekNumber = useWeekNumber(lastViewedDate);

  return (
    <div className="grid gap-4">
      <WeekDaysHeader />
      <section className="grid min-h-[calc(80vh-4rem)]">
        <h2 className="sr-only">Week {weekNumber}</h2>
        <ul className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from(
            { length: 7 },
            (_, i) =>
              new Date(
                currentYear,
                currentMonth,
                currentDate.getDate() - daysToFrstDayOfWeek + i
              )
          ).map((date) => (
            <EventDayListItem
              key={`week-view-${date.toISOString()}`}
              className="aspect-auto"
              date={date}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
