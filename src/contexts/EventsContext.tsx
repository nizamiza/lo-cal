import { createContext, PropsWithChildren, useContext } from "react";
import { Event } from "@/event/types";
import useEvents from "@/hooks/useEvents";
import { noop } from "@/shared/utils";

type EventsContextType = {
  events: Event[];
  refreshEvents: () => Promise<void>;
};

const EventsContext = createContext<EventsContextType>({
  events: [],
  refreshEvents: noop,
});

export function useEventsContext() {
  return useContext(EventsContext);
}

export default function EventsContextProvider({ children }: PropsWithChildren) {
  const [events, refreshEvents] = useEvents();

  return (
    <EventsContext.Provider value={{ events, refreshEvents }}>
      {children}
    </EventsContext.Provider>
  );
}
