import { createContext, useContext, useState, PropsWithChildren } from "react";
import { usePreference } from "@/contexts/Preferences";
import { useEventModal } from "@/contexts/EventModal";
import { noop } from "@/shared/utils";

export type DateChangeDirection = "previous" | "next";

type NavContextType = {
  handleDateChange: (direction: DateChangeDirection) => void;
  goToToday: () => void;
  openEventModal: () => void;
  openSettings: () => void;
  openSearch: () => void;
  closeEventModal: () => void;
  closeSettings: () => void;
  closeSearch: () => void;
  eventModalIsOpen: boolean;
  settingsIsOpen: boolean;
  searchIsOpen: boolean;
};

const NavContext = createContext<NavContextType>({
  handleDateChange: noop,
  goToToday: noop,
  openEventModal: noop,
  openSettings: noop,
  openSearch: noop,
  closeEventModal: noop,
  closeSettings: noop,
  closeSearch: noop,
  eventModalIsOpen: false,
  settingsIsOpen: false,
  searchIsOpen: false,
});

export const useNav = () => useContext(NavContext);

export default function NavProvider({ children }: PropsWithChildren) {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const [viewMode] = usePreference("view-mode");
  const [lastViewedDate, setLastViewedDate] = usePreference("last-viewed-date");

  const eventModal = useEventModal();

  const handleDateChange = (direction: "previous" | "next") => {
    const date = new Date(lastViewedDate);
    const coefficient = direction === "previous" ? -1 : 1;

    switch (viewMode) {
      case "day":
        date.setDate(date.getDate() + 1 * coefficient);
        break;
      case "week":
        date.setDate(date.getDate() + 7 * coefficient);
        break;
      case "month":
        date.setMonth(date.getMonth() + 1 * coefficient);
        break;
    }

    setLastViewedDate(date.toISOString());
  };

  const goToToday = () => {
    setLastViewedDate(new Date().toISOString());
  };

  const openSettings = () => {
    setSettingsIsOpen(true);
  };

  const openSearch = () => {
    setSearchIsOpen(true);
  };

  const closeSettings = () => {
    setSettingsIsOpen(false);
  };

  const closeSearch = () => {
    setSearchIsOpen(false);
  };

  return (
    <NavContext.Provider
      value={{
        handleDateChange,
        goToToday,
        openSettings,
        openSearch,
        closeSettings,
        closeSearch,
        settingsIsOpen,
        searchIsOpen,
        eventModalIsOpen: eventModal.isOpen,
        openEventModal: eventModal.openModal,
        closeEventModal: eventModal.closeModal,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}
