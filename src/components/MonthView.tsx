import { Fragment } from "react";
import { usePreference } from "@/contexts/Preferences";
import WeekDaysHeader from "@/components/WeekDaysHeader";
import EventDayListItem from "@/components/EventDayListItem";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export default function MonthView() {
  const [lastVisitedDate] = usePreference("last-viewed-date");

  const currentDate = new Date(lastVisitedDate);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const heading = `Days of ${Intl.DateTimeFormat("en-US", { month: "long" }).format(currentDate)} ${currentYear}`;

  return (
    <div className="grid gap-4">
      <WeekDaysHeader />
      <section>
        <h2 className="sr-only">{heading}</h2>
        <ul className="grid grid-cols-7 gap-1 sm:gap-2">
          {Array.from(
            { length: daysInMonth },
            (_, i) => new Date(currentYear, currentMonth, i + 1)
          ).map((date) => (
            <EventDayListItem
              key={`month-view-${date.toISOString()}`}
              date={date}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
