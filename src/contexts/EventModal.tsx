import { createContext, useContext, useState, PropsWithChildren } from "react";
import EventModal from "@/components/EventModal";
import { Event } from "@/event/types";
import { noop } from "@/shared/utils";

type EventModalContextType = {
  event: Event | null;
  setEvent: (event: Event | null) => void;
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
};

const EventModalContext = createContext<EventModalContextType>({
  event: null,
  setEvent: noop,
  openModal: noop,
  closeModal: noop,
  isOpen: false,
});

export function useEventModal() {
  return useContext(EventModalContext);
}

export default function EventModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);

  const openModal = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setEvent(null);
  };

  const modalIsOpen = !!event || isOpen;

  return (
    <EventModalContext.Provider
      value={{
        event,
        setEvent,
        openModal,
        closeModal: onClose,
        isOpen: modalIsOpen,
      }}
    >
      {children}
      <EventModal open={modalIsOpen} event={event} onClose={onClose} />
    </EventModalContext.Provider>
  );
}
