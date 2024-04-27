import NavPanel from "@/components/NavPanel";
import MonthView from "@/components/MonthView";
import WeekView from "@/components/WeekView";
import { usePreference } from "@/contexts/Preferences";

export default function Calendar() {
  const [viewMode] = usePreference("view-mode");

  return (
    <>
      {viewMode === "week" && <WeekView />}
      {viewMode === "month" && <MonthView />}
      <NavPanel />
    </>
  );
}
