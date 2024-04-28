import { twMerge } from "tailwind-merge";
import { Event } from "@/events/types";
import CalendarDayDateInfo from "@/components/CalendarDayDateInfo";
import CalendarDayEvents from "@/components/CalendarDayEvents";

type CalendarDayProps = {
  className?: string;
  date: Date;
  events?: Event[];
};

export default function CalendarDay({
  className,
  date,
  events = [],
}: CalendarDayProps) {
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <div
      className={twMerge(
        `
          surface
          ${isToday ? "[--base-color:var(--base-dark)]" : "[--surface-alpha:0.35]"}
          flex flex-col justify-start items-start 
          p-1 sm:p-2 aspect-square rounded-sm sm:rounded-md md:rounded-xl
        `,
        className
      )}
    >
      <CalendarDayDateInfo date={date} isToday={isToday} />
      <CalendarDayEvents events={events} />
    </div>
  );
}
