import { useMemo } from "react";
import Chevron from "@/icons/chevron";
import { usePreference } from "@/contexts/Preferences";
import useWeekNumber from "@/hooks/useWeekNumber";

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
    <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base">
      <button
        title={`Previous ${viewMode}`}
        onClick={() => handleDateChange("previous")}
      >
        <Chevron direction="left" />
      </button>
      <time dateTime={lastViewedDate} className="shrink-0">
        {formattedDate}
        {viewMode === "week" ? ` W${weekNumber}` : ""}
      </time>
      <button
        title={`Next ${viewMode}`}
        onClick={() => handleDateChange("next")}
      >
        <Chevron direction="right" />
      </button>
    </div>
  );
}
