import { HTMLAttributes } from "react";
import { usePreference } from "@/contexts/Preferences";
import { cn } from "@/shared/utils";

type TodayButtonProps = HTMLAttributes<HTMLButtonElement>;

export default function TodayButton({ className, ...props }: TodayButtonProps) {
  const [, setLastViewedDate] = usePreference("last-viewed-date");

  const handleClick = () => {
    setLastViewedDate(new Date().toISOString());
  };

  return (
    <button
      title="Go to today"
      className={cn("btn surface text-sm sm:text-base", className)}
      {...props}
      onClick={handleClick}
      type="button"
    >
      <span>
        <span>T</span>
        <span className="hidden sm:inline">oday</span>
      </span>
    </button>
  );
}
