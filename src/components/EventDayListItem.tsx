import { twMerge } from "tailwind-merge";

type EventDayListItemProps = {
  className?: string;
  date: Date;
};

export default function EventDayListItem({
  className,
  date,
}: EventDayListItemProps) {
  const dayNumber = date.getDate();
  const isToday = new Date().toDateString() === date.toDateString();

  return (
    <li
      className={twMerge(
        `
          surface
          ${isToday ? "[--base-color:var(--base-dark)]" : "[--surface-alpha:0.35]"}
          flex flex-col justify-start items-start 
          p-1 sm:p-2 aspect-square rounded-sm sm:rounded-md md:rounded-xl
        `,
        className,
      )}
    >
      <span className="flex flex-row items-center justify-between w-full gap-1">
        <span
          className={`text-[0.625rem] sm:text-xs md:text-sm ${isToday ? "font-bold" : ""}`}
        >
          {dayNumber}
        </span>
        {dayNumber === 1 && (
          <>
            <span className="date-note hidden sm:inline">
              {date.toLocaleString("default", { month: "short" })}
            </span>
            <span className="date-note sm:hidden">
              {date.toLocaleString("default", { month: "narrow" })}
            </span>
          </>
        )}
        {isToday && <span className="date-note hidden md:inline">Today</span>}
      </span>
    </li>
  );
}
