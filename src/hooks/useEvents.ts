import { useEffect, useState } from "react";
import { getEvents } from "@/event/indexed-db";
import { EventFilter } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

type UseEventsParams = {
  where?: EventFilter;
};

export default function useEvents({ where }: UseEventsParams = {}) {
  const [events, setEvents] = useState<ReturnType<typeof getEvents>>([]);
  const { addMessage } = useStatusMessages();

  useEffect(() => {
    getEvents()
      .then((events) =>
        events.filter((event) => {
          if (!where) {
            return true;
          }

          return Object.entries(where).every(([key, value]) =>
            event[key].toString().contains(value.toString())
          );
        })
      )
      .catch((error) => {
        logError(error, () => {
          addMessage({
            type: "error",
            content: "Failed to load events.",
          });
        });
      });
  }, [where]);

  return events;
}
