import { createContext, PropsWithChildren, useContext } from "react";
import useEvents from "@/hooks/useEvents";

type EventsContextType = {
  events: Event[];
};

const EventsContext = createContext<EventsContextType>({
  events: [],
});

export function useEventsContext() {
  return useContext(EventsContext);
}

export default function EventsContextProvider({ children }: PropsWithChildren) {
  const events = useEvents();

  return (
    <EventsContext.Provider value={{ events }}>
      {children}
    </EventsContext.Provider>
  );
}
