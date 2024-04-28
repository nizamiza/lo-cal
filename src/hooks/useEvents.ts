import { useEffect, useState } from "react";
import { getEvents } from "@/event/indexed-db";
import { Event } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useEvents(): Event[] {
  const [events, setEvents] = useState<Event[]>([]);
  const { addMessage } = useStatusMessages();

  useEffect(() => {
    getEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        logError(error, () => {
          addMessage({
            type: "error",
            content: "Failed to load events.",
          });
        });
      });
  }, [addMessage]);

  return events;
}
