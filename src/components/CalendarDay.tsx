import { MouseEvent } from "react";
import { Event } from "@/event/types";
import CalendarDayDateInfo from "@/components/CalendarDayDateInfo";
import CalendarDayEvents from "@/components/CalendarDayEvents";
import { usePreference } from "@/contexts/Preferences";
import { cn } from "@/shared/utils";

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
  const [, setLastViewedDate] = usePreference("last-viewed-date");
  const [viewMode, setViewMode] = usePreference("view-mode");

  const isToday = new Date().toDateString() === date.toDateString();

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (viewMode !== "day") {
      setLastViewedDate(date.toISOString());
      setViewMode("day");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "surface @container dark:border-[1.5px] dark:[--border-alpha:0.15]",
        viewMode !== "day" ? "cursor-pointer" : "",
        isToday
          ? "[--base-color:var(--base-dark)] [--surface-alpha:0.5]"
          : "[--surface-alpha:0.35]",
        "flex flex-col justify-start items-start gap-1 sm:gap-2 h-full",
        "p-1 sm:p-2 aspect-square rounded-sm sm:rounded-md md:rounded-xl",
        className
      )}
    >
      <CalendarDayDateInfo date={date} isToday={isToday} />
      <CalendarDayEvents events={events} />
    </div>
  );
}
