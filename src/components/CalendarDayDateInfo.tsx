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
          "grid gap-1 items-center justify-items-center w-full @xs:p-0.5",
          "@[12rem]:grid-cols-[.2fr_1fr_.2fr] grid-cols-[auto_1fr]"
        )}
      >
        <span
          className={cn(
            "text-[0.5rem] @[4rem]:text-[0.675rem] @xs:text-xs @sm:text-sm",
            "@md:text-base justify-self-start",
            isToday && "font-bold"
          )}
          role="presentation"
        >
          {dayNumber}
        </span>
        {dayNumber === 1 && (
          <>
            <span className="date-note hidden @xs:inline" role="presentation">
              Start of {date.toLocaleString("default", { month: "short" })}
            </span>
            <span
              className={cn(
                "date-note hidden justify-self-end @[10rem]:inline",
                "@[12rem]:justify-self-center @xs:hidden"
              )}
              role="presentation"
            >
              {date.toLocaleString("default", { month: "short" })}
            </span>
            <span
              className="date-note justify-self-end @[10rem]:hidden"
              role="presentation"
            >
              {date.toLocaleString("default", { month: "narrow" })}
            </span>
          </>
        )}
        {isToday && (
          <span className="date-note hidden @[12rem]:inline justify-self-end">
            Today
          </span>
        )}
      </span>
    </>
  );
}
