import { useMemo } from "react";
import { usePreference } from "@/contexts/Preferences";
import { useNav } from "@/contexts/Nav";
import useWeekNumber from "@/hooks/useWeekNumber";
import Chevron from "@/icons/chevron";
import { cn } from "@/shared/utils";

export default function DateControls() {
  const [viewMode] = usePreference("view-mode");
  const [lastViewedDate] = usePreference("last-viewed-date");

  const weekNumber = useWeekNumber(lastViewedDate);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(
        "en-US",
        viewMode === "day"
          ? {
              day: "numeric",
              month: "long",
            }
          : viewMode === "week"
            ? {
                month: "short",
              }
            : {
                month: "long",
                year: "numeric",
              }
      ).format(new Date(lastViewedDate)),
    [lastViewedDate, viewMode]
  );

  const { handleDateChange } = useNav();

  return (
    <div
      className={cn(
        "flex items-center gap-2 @xs:gap-3 text-xs @xs:text-sm @sm:text-base"
      )}
    >
      <button
        title={`Previous ${viewMode}`}
        onClick={() => handleDateChange("previous")}
        type="button"
      >
        <Chevron direction="left" />
      </button>
      <time dateTime={lastViewedDate} className="text-center">
        {formattedDate}
        {viewMode === "week" ? ` W${weekNumber}` : ""}
      </time>
      <button
        title={`Next ${viewMode}`}
        onClick={() => handleDateChange("next")}
        type="button"
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}
