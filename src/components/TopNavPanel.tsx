import Today from "@/components/Today";
import TodayButton from "@/components/TodayButton";
import SkipToContentButton from "@/components/SkipToContentButton";
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
      <div className="grid">
        <SkipToContentButton
          className={cn(
            "hidden sm:flex row-start-1 row-end-2 col-start-1 col-end-2 focus-visible:order-1"
          )}
        />
        <TodayButton
          className={cn(
            "row-start-1 row-end-2 col-start-1 col-end-2",
            "justify-self-center sm:justify-self-start"
          )}
        />
      </div>
      <Search className="hidden md:inline-flex" />
      <Today />
      <Settings
        className={cn("justify-self-center sm:justify-self-end md:col-span-2")}
      />
    </nav>
  );
}
