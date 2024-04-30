import { cn } from "@/shared/utils";

type CalendarDayDateInfoProps = {
  date: Date;
  isToday?: boolean;
};

export default function CalendarDayDateInfo({
  date,
  isToday,
}: CalendarDayDateInfoProps) {
  const dayNumber = date.getDate();

  return (
    <>
      <time dateTime={date.toISOString()} className="sr-only">
        {date.toDateString()}
      </time>
      <span
        className={cn(
          "flex flex-row items-center justify-between w-full gap-1 @xs:gap-2"
        )}
      >
        <span
          className={cn(
            "text-[0.5rem] @[4rem]:text-[0.675rem] @xs:text-xs @sm:text-sm",
            "@md:text-base",
            isToday && "font-bold"
          )}
          role="presentation"
        >
          {dayNumber}
        </span>
        {dayNumber === 1 && (
          <>
            <span className="date-note hidden sm:inline" role="presentation">
              {date.toLocaleString("default", { month: "short" })}
            </span>
            <span className="date-note sm:hidden" role="presentation">
              {date.toLocaleString("default", { month: "narrow" })}
            </span>
          </>
        )}
        {isToday && (
          <span className="date-note hidden @[12rem]:inline">Today</span>
        )}
      </span>
    </>
  );
}
