import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import CommandIcon from "@/icons/command";
import { usePreferences, PreferenceKey } from "@/contexts/Preferences";
import { useNav, DateChangeDirection } from "@/contexts/Nav";
import { cn } from "@/shared/utils";

const KEYBOARD_SHORTCUTS = {
  D: {
    label: "Switch to day view",
    action: "preference:view-mode:day",
  },
  W: {
    label: "Switch to week view",
    action: "preference:view-mode:week",
  },
  M: {
    label: "Switch to month view",
    action: "preference:view-mode:month",
  },
  N: {
    label: "Add new event",
    action: "nav:add-event",
  },
  T: {
    label: "Go to today",
    action: "nav:today",
  },
  ArrowLeft: {
    label: "Navigate to previous date",
    action: "nav:date:previous",
  },
  ArrowRight: {
    label: "Navigate to next date",
    action: "nav:date:next",
  },
  S: {
    label: "Open settings",
    action: "nav:settings",
  },
  "?": {
    label: "Show keyboard shortcuts",
    action: "help",
  },
} as const;

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const { setPreference } = usePreferences();
  const {
    handleDateChange,
    openEventModal,
    goToToday,
    openSettings,
    openSearch,
    eventModalIsOpen,
    settingsIsOpen,
    searchIsOpen,
  } = useNav();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ([eventModalIsOpen, settingsIsOpen, searchIsOpen].some(Boolean)) {
        return;
      }

      const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;

      if (event.ctrlKey && key === "K") {
        openSearch();
        return;
      }

      const shortcut =
        KEYBOARD_SHORTCUTS[key as keyof typeof KEYBOARD_SHORTCUTS];

      if (!shortcut) {
        return;
      }

      const [category, action, value] = shortcut.action.split(":");

      if (category === "preference") {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        setPreference(action as PreferenceKey, value as any);
        return;
      }

      if (category === "nav") {
        switch (action) {
          case "date":
            handleDateChange(value as DateChangeDirection);
            return;
          case "today":
            goToToday();
            return;
          case "add-event":
            openEventModal();
            return;
          case "settings":
            openSettings();
            return;
        }

        return;
      }

      if (category === "help") {
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    eventModalIsOpen,
    settingsIsOpen,
    searchIsOpen,
    setPreference,
    handleDateChange,
    goToToday,
    openEventModal,
    openSettings,
    openSearch,
  ]);

  return (
    <>
      <button
        className="hidden sm:inline-flex fixed bottom-11 right-8 btn bordered"
        title="Open keyboard shortcuts"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <CommandIcon />
      </button>
      <Modal
        className="text-left"
        title="Keyboard shortcuts"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        actions={
          <>
            <button
              className="btn bordered"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Close
            </button>
          </>
        }
      >
        <p>Enhance your navigation with these shortcuts!</p>
        <ul
          className={cn(
            "flex flex-col gap-2",
            "[&>li]:grid [&>li]:grid-cols-[6ch_1fr] [&>li]:gap-4 [&>li]:items-start"
          )}
        >
          {Object.entries(KEYBOARD_SHORTCUTS).map(
            ([key, { label, action }]) => (
              <li key={action}>
                <strong>
                  <kbd>
                    {key.startsWith("Arrow")
                      ? key === "ArrowLeft"
                        ? "←"
                        : "→"
                      : key}
                  </kbd>
                </strong>{" "}
                {label}
              </li>
            )
          )}
          <li>
            <strong>
              <kbd>Ctrl+K</kbd>
            </strong>{" "}
            Open search
          </li>
        </ul>
      </Modal>
    </>
  );
}
