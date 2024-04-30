import { useEffect } from "react";
import { usePreference } from "@/contexts/Preferences";
import useDateTimeFormatter from "@/hooks/useDateTimeFormatter";
import { cn } from "@/shared/utils";

const CURRENT_TIME_ID = "current-time";

export default function Today() {
  const [dateTimeFormat] = usePreference("date-time-format");
  const [showTime] = usePreference("show-time");

  const dateFormatter = useDateTimeFormatter({
    timeStyle: undefined,
  });

  const timeFormatter = useDateTimeFormatter({
    dateStyle: undefined,
  });

  useEffect(() => {
    const timeElement = document.getElementById(
      CURRENT_TIME_ID
    ) as HTMLTimeElement | null;

    if (!timeElement || !showTime) {
      return;
    }

    const updateCurrentTime = () => {
      const currentDate = new Date();

      timeElement.dateTime = currentDate.toISOString();
      timeElement.textContent = timeFormatter.format(currentDate);
    };

    updateCurrentTime();
    const intervalId = setInterval(updateCurrentTime, 1_000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeFormatter, showTime, dateTimeFormat]);

  return (
    <h2
      className={cn(
        "inline-flex flex-col gap-1",
        "text-xs sm:h6 sm:h5 md:h4 justify-self-center text-center"
      )}
    >
      Today is {dateFormatter.format(new Date())}
      {showTime && <time className="date-note" id={CURRENT_TIME_ID} />}
    </h2>
  );
}
