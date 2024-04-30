import Today from "@/components/Today";
import TodayButton from "@/components/TodayButton";
import Settings from "@/components/Settings";
import Search from "@/components/Search";
import { cn } from "@/shared/utils";

export default function TopNavPanel() {
  return (
    <nav
      aria-label="Today, search, and settings"
      className={cn(
        "grid grid-cols-[.2fr_1fr_.2fr] md:grid-cols-[5rem_3rem_1fr_3rem_5rem]",
        "items-center gap-2 md:gap-4"
      )}
    >
      <TodayButton className="justify-self-center sm:justify-self-start" />
      <Search className="hidden md:inline-flex" />
      <Today />
      <Settings
        className={cn("justify-self-center sm:justify-self-end md:col-span-2")}
      />
    </nav>
  );
}
