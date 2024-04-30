import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { getEvents } from "@/event/indexed-db";
import { Event } from "@/event/types";
import { noop, logError } from "@/shared/utils";

type EventsContextType = {
  events: Event[];
  refreshEvents: () => Promise<void>;
};

const EventsContext = createContext<EventsContextType>({
  events: [],
  refreshEvents: noop,
});

export function useEvents() {
  return useContext(EventsContext);
}

export default function EventsProvider({ children }: PropsWithChildren) {
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

  return (
    <EventsContext.Provider value={{ events, refreshEvents: fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
