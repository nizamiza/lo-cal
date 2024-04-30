import { HTMLAttributes } from "react";
import { useNav } from "@/contexts/Nav";
import { cn } from "@/shared/utils";

type TodayButtonProps = HTMLAttributes<HTMLButtonElement>;

export default function TodayButton({ className, ...props }: TodayButtonProps) {
  const { goToToday } = useNav();

  return (
    <button
      title="Go to today"
      className={cn("btn surface text-sm sm:text-base", className)}
      {...props}
      onClick={goToToday}
      type="button"
    >
      <span>
        <span>T</span>
        <span className="hidden sm:inline">oday</span>
      </span>
    </button>
  );
}
