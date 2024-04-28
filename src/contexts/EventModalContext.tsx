import { createContext, useContext, useState, PropsWithChildren } from "react";
import { Event } from "@/event/types";
import EventModal from "@/components/EventModal";
import { noop } from "@/shared/utils";

type EventModalContextType = {
  event: Event | null;
  setEvent: (event: Event | null) => void;
  openModal: () => void;
};

const EventModalContext = createContext<EventModalContextType>({
  event: null,
  setEvent: noop,
  openModal: noop,
});

export function useEventModalContext() {
  return useContext(EventModalContext);
}

export default function EventModalContextProvider({
  children,
}: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);

  const openModal = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setEvent(null);
  };

  return (
    <EventModalContext.Provider value={{ event, setEvent, openModal }}>
      {children}
      <EventModal open={!!event || isOpen} event={event} onClose={onClose} />
    </EventModalContext.Provider>
  );
}
