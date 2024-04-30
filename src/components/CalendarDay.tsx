import { UIEvent } from "react";
import { Event as CalendarEvent } from "@/event/types";
import CalendarDayDateInfo from "@/components/CalendarDayDateInfo";
import CalendarDayEvents from "@/components/CalendarDayEvents";
import { usePreference } from "@/contexts/Preferences";
import { useEventModal } from "@/contexts/EventModal";
import { cn } from "@/shared/utils";

type CalendarDayProps = {
  className?: string;
  date: Date;
  events?: CalendarEvent[];
};

export default function CalendarDay({
  className,
  date,
  events = [],
}: CalendarDayProps) {
  const [, setLastViewedDate] = usePreference("last-viewed-date");
  const [viewMode, setViewMode] = usePreference("view-mode");

  const { openModal } = useEventModal();

  const isToday = new Date().toDateString() === date.toDateString();

  const handleClick = (event: UIEvent) => {
    event.preventDefault();

    if (viewMode !== "day") {
      setLastViewedDate(date.toISOString());
      setViewMode("day");
    } else {
      openModal();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick(e);
        }
      }}
      tabIndex={0}
      className={cn(
        "surface @container cursor-pointer",
        "[--border-alpha:0.1] dark:[--border-alpha:0.15]",
        "flex flex-col justify-start items-start gap-1 @sm:gap-2 h-full",
        "p-1 sm:p-2 aspect-square rounded-sm sm:rounded-md md:rounded-xl",
        ...(isToday
          ? [
              "[box-shadow:var(--shadow)] [--border-alpha:1]",
              "focus-visible:[box-shadow:var(--shadow),0_0_0.75em_var(--base-color)]",
              "dark:shadow-none dark:border-[1.5px] dark:[--border-alpha:0.5]",
            ]
          : ["bordered [--surface-alpha:0.35]"]),
        ...(viewMode === "day"
          ? [
              "[--shadow-offset:0.25rem] @sm:[--shadow-offset:0.5rem]",
              "@md:[--shadow-offset:0.75rem]",
            ]
          : []),
        className
      )}
    >
      <CalendarDayDateInfo date={date} isToday={isToday} />
      <CalendarDayEvents events={events} />
    </div>
  );
}
