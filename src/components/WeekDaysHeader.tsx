import { Fragment } from "react";
import useWeekDays from "@/hooks/useWeekDays";
import { cn } from "@/shared/utils";

type WeekDaysHeaderProps = {
  className?: string;
  listClassName?: string;
  separatorClassName?: string;
};

export default function WeekDaysHeader({
  className,
  listClassName,
  separatorClassName,
}: WeekDaysHeaderProps) {
  const weekDays = useWeekDays();

  return (
    <header
      className={cn(
        "surface [--surface-alpha:0.8] backdrop-blur-sm rounded-full sticky top-4 z-50",
        className
      )}
    >
      <h2 className="sr-only">Weekdays</h2>
      <div
        className={cn(
          "[--g:_0.5rem]",
          "grid grid-cols-[1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr_var(--g)_1fr]",
          "justify-items-center items-center py-2 sm:py-3",
          listClassName
        )}
      >
        {weekDays.map((day, index) => (
          <Fragment key={day}>
            <div className="text-sm md:text-base lg:text-lg text-center">
              <span aria-label={day} className="mx-auto">
                <span>{day.charAt(0)}</span>
                <span className="hidden sm:inline">{day.charAt(1)}</span>
                <span className="hidden md:inline">{day.charAt(2)}</span>
              </span>
            </div>
            {index < weekDays.length - 1 && (
              <hr className={cn("separator h-[1lh]", separatorClassName)} />
            )}
          </Fragment>
        ))}
      </div>
    </header>
  );
}
