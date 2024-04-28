import { useEffect, useState } from "react";
import { getEvents } from "@/event/indexed-db";
import { Event, EventFilter } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

type UseEventsParams = {
  where?: EventFilter;
};

export default function useEvents({ where }: UseEventsParams = {}) {
  const [events, setEvents] = useState<Event[]>([]);
  const { addMessage } = useStatusMessages();

  useEffect(() => {
    getEvents()
      .then((events) => {
        setEvents(
          events.filter((event) => {
            if (!where) {
              return true;
            }

            return Object.entries(where).every(([key, value]) =>
              event[key as keyof Event]?.toString().includes(value.toString()),
            );
          }),
        );
      })
      .catch((error) => {
        logError(error, () => {
          addMessage({
            type: "error",
            content: "Failed to load events.",
          });
        });
      });
  }, [where, addMessage]);

  return events;
}
