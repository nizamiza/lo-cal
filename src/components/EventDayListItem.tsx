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
          p-1 sm:p-2 aspect-square rounded-xl
        `,
        className
      )}
    >
      <span className="flex flex-row items-center justify-between w-full gap-1">
        <span className={`text-xs sm:text-sm ${isToday ? "font-bold" : ""}`}>
          {dayNumber}
        </span>
        {dayNumber === 1 && (
          <span className="date-note">
            {date.toLocaleString("default", { month: "short" })}
          </span>
        )}
        {isToday && <span className="date-note">Today</span>}
      </span>
    </li>
  );
}
