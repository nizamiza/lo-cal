import { useMemo } from "react";
import Chevron from "@/icons/chevron";
import Plus from "@/icons/plus";
import { usePreference } from "@/contexts/Preferences";
import BaseColorSelect from "@/components/BaseColorSelect";
import ViewModeSelect from "@/components/ViewModeSelect";
import useWeekNumber from "@/hooks/useWeekNumber";

export default function NavPanel() {
  const [lastViewedDate, setLastViewedDate] = usePreference("last-viewed-date");
  const [viewMode, setViewMode] = usePreference("view-mode");
  const weekNumber = useWeekNumber(lastViewedDate);

  const handleDateChange = (direction: "previous" | "next") => {
    const date = new Date(lastViewedDate);
    const coefficient = direction === "previous" ? -1 : 1;

    console.log(lastViewedDate);
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

  const currentDate = new Date(lastViewedDate);
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat(
        "en-US",
        viewMode === "day"
          ? {
              day: "numeric",
            }
          : viewMode === "week"
            ? {
                month: "short",
              }
            : {
                month: "long",
                year: "numeric",
              }
      ).format(currentDate),
    [currentDate, viewMode]
  );

  return (
    <nav
      className={`
        surface [--surface-alpha:0.8]
        sticky bottom-5 mx-auto max-w-[calc(100vw-2rem)] z-90
        flex items-center justify-center gap-4
        p-4 sm:px-6 rounded-full backdrop-blur-md
      `}
    >
      <ViewModeSelect />
      <BaseColorSelect />
      <button
        title={`Previous ${viewMode}`}
        onClick={() => handleDateChange("previous")}
      >
        <Chevron direction="left" />
      </button>
      <time dateTime={lastViewedDate}>
        {formattedDate}
        {viewMode === "week" ? ` W${weekNumber}` : ""}
      </time>
      <button
        title={`Next ${viewMode}`}
        onClick={() => handleDateChange("next")}
      >
        <Chevron direction="right" />
      </button>
      <hr className="separator h-[1lh]" />
      <button title="Create new event">
        <Plus />
      </button>
    </nav>
  );
}
