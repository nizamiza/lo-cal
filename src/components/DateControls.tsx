import { useMemo } from "react";
import Chevron from "@/icons/chevron";
import { usePreference } from "@/contexts/Preferences";
import useWeekNumber from "@/hooks/useWeekNumber";
import { cn } from "@/shared/utils";

export default function DateControls() {
  const [viewMode] = usePreference("view-mode");
  const [lastViewedDate, setLastViewedDate] = usePreference("last-viewed-date");

  const weekNumber = useWeekNumber(lastViewedDate);

  const handleDateChange = (direction: "previous" | "next") => {
    const date = new Date(lastViewedDate);
    const coefficient = direction === "previous" ? -1 : 1;

    switch (viewMode) {
      case "day":
        date.setDate(date.getDate() + 1 * coefficient);
        break;
      case "week":
        date.setDate(date.getDate() + 7 * coefficient);
        break;
      case "month":
        date.setMonth(date.getMonth() + 1 * coefficient);
        break;
    }

    setLastViewedDate(date.toISOString());
  };

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
