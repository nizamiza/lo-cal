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

  return (
    <li
      className={twMerge(
        `
          surface [--surface-alpha:0.35]
          flex flex-col justify-start items-start 
          p-1 sm:p-2 aspect-square rounded-xl
        `,
        className
      )}
    >
      <span className="flex flex-row items-center justify-between w-full gap-2">
        <span className="text-xs sm:text-sm">{dayNumber}</span>
        {dayNumber === 1 && (
          <span className="text-xs sm:text-sm [--text-alpha:0.5] uppercase font-semibold">
            {date.toLocaleString("default", { month: "short" })}
          </span>
        )}
      </span>
    </li>
  );
}
