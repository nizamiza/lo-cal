import { useCallback, useMemo } from "react";
import { usePreference } from "@/contexts/Preferences";
import { useEvents } from "@/contexts/Events";

export default function useCalendarViewModel() {
  const { events } = useEvents();
  const [lastViewedDate] = usePreference("last-viewed-date");

  const currentDateInfo = useMemo(() => {
    const date = new Date(lastViewedDate);

    return {
      date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    };
  }, [lastViewedDate]);

  const getEventsOnDate = useCallback(
    (date: Date) => {
      const eventsOnDate = events.filter((event) => {
        const eventDate = new Date(event.start);

        return (
          eventDate.getFullYear() === date.getFullYear() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getDate() === date.getDate()
        );
      });

      eventsOnDate.sort((a, b) => {
        const aDate = new Date(a.start);
        const bDate = new Date(b.start);

        return aDate.getTime() - bDate.getTime();
      });

      return eventsOnDate;
    },
    [events]
  );

  return [currentDateInfo, getEventsOnDate] as const;
}
