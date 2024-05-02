import { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";

type SkipToContentButtonProps = HTMLAttributes<HTMLButtonElement>;

export default function SkipToContentButton({ className, ...props }) {
  const handleClick = () => {
    const firstCalendarDay = document.querySelector(
      ".calendar-day:first-of-type"
    );

    if (firstCalendarDay) {
      firstCalendarDay.focus();
    }
  };

  return (
    <button
      className={cn(
        "btn surface opacity-0 pointer-events-none",
        "focus-visible:opacity-100 focus-visible:pointer-events-auto",
        className
      )}
      {...props}
      type="button"
      title="Skip to the main content"
      onClick={handleClick}
    >
      Skip to content
    </button>
  );
}
