import { useMemo } from "react";
import Chevron from "@/icons/chevron";
import { usePreference } from "@/contexts/Preferences";

export default function NavPanel() {
  const [lastViewedDate, setLastViewedDate] = usePreference("last-viewed-date");
  const [viewMode] = usePreference("view-mode");

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
                day: "numeric",
              }
            : {
                month: "long",
                year: "numeric",
              }
      ).format(currentDate),
    [currentDate, viewMode]
  );

  return (
    <nav>
      <time dateTime={lastViewedDate}>{formattedDate}</time>
      <button
        title={`Previous ${viewMode}`}
        onClick={() => handleDateChange("previous")}
      >
        <Chevron direction="left" />
      </button>
      <button
        title={`Next ${viewMode}`}
        onClick={() => handleDateChange("next")}
      >
        <Chevron direction="right" />
      </button>
    </nav>
  );
}
