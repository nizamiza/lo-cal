import { Fragment } from "react";
import useWeekDays from "@/hooks/useWeekDays";

export default function WeekDaysHeader() {
  const weekDays = useWeekDays();

  return (
    <header className="surface [--surface-alpha:0.8] backdrop-blur-sm rounded-full sticky top-0 z-50">
      <h2 className="sr-only">Weekdays</h2>
      <ul
        className={`
          [--g:_0.5rem]
          grid grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr]
          justify-items-center items-center py-2 sm:py-3 
        `}
      >
        {weekDays.map((day, index) => (
          <Fragment key={day}>
            <li className="text-sm md:text-base lg:text-lg text-center">
              <span className="mx-auto">{day}</span>
            </li>
            {index < weekDays.length - 1 && (
              <hr className="separator h-[1lh]" />
            )}
          </Fragment>
        ))}
      </ul>
    </header>
  );
}
