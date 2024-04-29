import { useEffect, useState, useCallback } from "react";
import { getEvents } from "@/event/indexed-db";
import { Event } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const { addMessage } = useStatusMessages();

  const fetchEvents = useCallback(async () => {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (error) {
      logError(error, () => {
        addMessage({
          type: "error",
          content: "Failed to load events.",
        });
      });
    }
  }, [addMessage]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return [events, fetchEvents] as const;
}
