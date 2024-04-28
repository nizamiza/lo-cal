import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { usePreference } from "@/contexts/Preferences";

type TodayButtonProps = HTMLAttributes<HTMLButtonElement>;

export default function TodayButton({ className, ...props }: TodayButtonProps) {
  const [, setLastViewedDate] = usePreference("last-viewed-date");

  const handleClick = () => {
    setLastViewedDate(new Date().toISOString());
  };

  return (
    <button
      className={twMerge("btn surface text-sm sm:text-base", className)}
      {...props}
      onClick={handleClick}
    >
      <span>
        <span>T</span>
        <span className="hidden sm:inline">oday</span>
      </span>
    </button>
  );
}
