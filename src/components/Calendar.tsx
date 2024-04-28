import NavPanel from "@/components/NavPanel";
import MonthView from "@/components/MonthView";
import WeekView from "@/components/WeekView";
import DayView from "@/components/DayView";
import TodayButton from "@/components/TodayButton";
import Settings from "@/components/Settings";
import EventModalContextProvider from "@/contexts/EventModalContext";
import EventsContextProvider from "@/contexts/EventsContext";
import { usePreference } from "@/contexts/Preferences";

export default function Calendar() {
  const [viewMode] = usePreference("view-mode");

  return (
    <EventsContextProvider>
      <EventModalContextProvider>
        <nav
          aria-label="Today and settings"
          className="flex justify-between items-center gap-2"
        >
          <TodayButton className="self-center" />
          <h2 className="h6 sm:h5 md:h4 text-center">
            Today is{" "}
            {new Date().toLocaleDateString("en-US", { dateStyle: "full" })}
          </h2>
          <Settings />
        </nav>
        {viewMode === "week" && <WeekView />}
        {viewMode === "month" && <MonthView />}
        {viewMode === "day" && <DayView />}
        <NavPanel />
      </EventModalContextProvider>
    </EventsContextProvider>
  );
}
