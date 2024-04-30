import { useEffect, useState } from "react";
import FormField from "@/components/FormField";
import Modal from "@/components/Modal";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/contexts/Events";
import { usePreference } from "@/contexts/Preferences";
import { useNav } from "@/contexts/Nav";
import { Event } from "@/event/types";
import SearchIcon from "@/icons/search";
import { cn } from "@/shared/utils";

type SearchProps = {
  className?: string;
};

export default function Search({ className }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>([]);

  const { events } = useEvents();
  const { searchIsOpen, openSearch, closeSearch, setViewMode } = useNav();

  const [, setLastViewedDate] = usePreference("last-viewed-date");

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    const formattedTerm = value.trim().toLowerCase();

    if (!formattedTerm) {
      setSearchResults([]);
      return;
    }

    const results = events.filter((event) =>
      Object.values(event).some((value) =>
        String(value).trim().toLowerCase().includes(formattedTerm)
      )
    );

    setSearchResults(results);
  };

  const handleEventClick = (event: Event) => {
    closeSearch();

    setViewMode("day");
    setLastViewedDate(event.start);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch();
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeSearch, setSearchTerm, setSearchResults]);

  return (
    <>
      <button
        className={cn("btn p-1.5", className)}
        title="Search events"
        type="button"
        onClick={openSearch}
      >
        <SearchIcon />
      </button>
      <Modal
        title="Search events"
        open={searchIsOpen}
        onClose={closeSearch}
        sr-only-title
      >
        <FormField
          label="Search"
          id="search"
          placeholder="Search..."
          type="search"
          inputMode="search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul className="flex flex-col gap-2">
          {searchResults.map((event, index) => (
            <li key={index}>
              <EventCard
                event={event}
                onClick={() => handleEventClick(event)}
              />
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
