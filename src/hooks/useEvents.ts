import { useEffect, useState } from "react";
import { getEvents } from "@/event/indexed-db";
import { EventFilter } from "@/event/types";

type UseEventsParams = {
  where?: EventFilter;
};

export default function useEvents({ where }: UseEventsParams = {}) {
  const [events, setEvents] = useState<ReturnType<typeof getEvents>>([]);

  useEffect(() => {
    getEvents().then((events) =>
      events.filter((event) => {
        if (!where) {
          return true;
        }

        return Object.entries(where).every(([key, value]) =>
          event[key].toString().contains(value.toString())
        );
      })
    );
  }, [where]);

  return events;
}
