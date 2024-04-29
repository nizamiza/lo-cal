import { useState, useEffect, MouseEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Event } from "@/events/types";
import CalendarDayDateInfo from "@/components/CalendarDayDateInfo";
import CalendarDayEvents from "@/components/CalendarDayEvents";
import { usePreference } from "@/contexts/Preferences";

type CalendarDayProps = {
  className?: string;
  date: Date;
  events?: Event[];
};

const BREAKPOINT = 550;

export default function CalendarDay({
  className,
  date,
  events = [],
}: CalendarDayProps) {
  const [isOnLargerScreen, setIsOnLargerScreen] = useState(false);

  const [, setLastViewedDate] = usePreference("last-viewed-date");
  const [viewMode, setViewMode] = usePreference("view-mode");

  const isToday = new Date().toDateString() === date.toDateString();

  useEffect(() => {
    const media = window.matchMedia(`(min-width:${BREAKPOINT}px)`);

    const handleResize = () => {
      setIsOnLargerScreen(media.matches);
    };

    handleResize();
    media.addEventListener("change", handleResize);
  }, []);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();

    if (!isOnLargerScreen && viewMode === "month") {
      setLastViewedDate(date.toISOString());
      setViewMode("day");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={twMerge(
        `
          surface
          ${isToday ? "[--base-color:var(--base-dark)]" : "[--surface-alpha:0.35]"}
          flex flex-col justify-start items-start gap-1 sm:gap-2
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
