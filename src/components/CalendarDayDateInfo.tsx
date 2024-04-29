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
      <span className="flex flex-row items-center justify-between w-full gap-1">
        <span
          className={`
            text-[0.5rem] sm:text-xs md:text-sm ${isToday ? "font-bold" : ""}
          `}
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
        {isToday && <span className="date-note hidden md:inline">Today</span>}
      </span>
    </>
  );
}
