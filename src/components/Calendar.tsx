import MonthView from "@/components/MonthView";
import WeekView from "@/components/WeekView";
import DayView from "@/components/DayView";
import NavPanel from "@/components/NavPanel";
import TopNavPanel from "@/components/TopNavPanel";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import NavProvider from "@/contexts/Nav";
import EventModalProvider from "@/contexts/EventModal";
import EventsProvider from "@/contexts/Events";
import { usePreference } from "@/contexts/Preferences";

export default function Calendar() {
  const [viewMode] = usePreference("view-mode");

  return (
    <EventsProvider>
      <EventModalProvider>
        <NavProvider>
          <TopNavPanel />
          {viewMode === "week" && <WeekView />}
          {viewMode === "month" && <MonthView />}
          {viewMode === "day" && <DayView />}
          <NavPanel />
          <KeyboardShortcuts />
        </NavProvider>
      </EventModalProvider>
    </EventsProvider>
  );
}
