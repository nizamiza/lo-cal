import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import CommandIcon from "@/icons/command";
import { usePreferences, PreferenceKey } from "@/contexts/Preferences";
import { useNav, DateChangeDirection } from "@/contexts/Nav";

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
  const { handleDateChange, openEventModal, goToToday, openSettings } =
    useNav();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = (
        event.key.length === 1 ? event.key.toUpperCase() : event.key
      ) as keyof typeof KEYBOARD_SHORTCUTS;

      const shortcut = KEYBOARD_SHORTCUTS[key];

      if (!shortcut) {
        return;
      }

      event.preventDefault();
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
    setPreference,
    handleDateChange,
    goToToday,
    openEventModal,
    openSettings,
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
        <ul className="flex flex-col gap-2">
          {Object.entries(KEYBOARD_SHORTCUTS).map(
            ([key, { label, action }]) => (
              <li
                key={action}
                className="grid grid-cols-[2ch_1fr] gap-4 items-start"
              >
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
        </ul>
      </Modal>
    </>
  );
}
