import Today from "@/components/Today";
import TodayButton from "@/components/TodayButton";
import Settings from "@/components/Settings";

export default function TopNavPanel() {
  return (
    <nav
      aria-label="Today and settings"
      className="grid grid-cols-[.2fr_1fr_.2fr] items-center gap-2"
    >
      <TodayButton className="justify-self-center sm:justify-self-start" />
      <Today />
      <Settings className="justify-self-center sm:justify-self-end" />
    </nav>
  );
}
