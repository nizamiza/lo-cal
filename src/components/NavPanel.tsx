import Plus from "@/icons/plus";
import ViewModeSelect from "@/components/ViewModeSelect";
import DateControls from "@/components/DateControls";
import { useEventModal } from "@/contexts/EventModal";
import { cn } from "@/shared/utils";

export default function NavPanel() {
  const { openModal } = useEventModal();

  return (
    <nav
      id="nav-panel"
      aria-label="Navigation panel"
      className={cn(
        "surface [--surface-alpha:0.8] bordered [--border-alpha:0.15]",
        "sticky bottom-5 mt-auto mx-auto max-w-[calc(100vw-2rem)] z-90",
        "flex items-center justify-center gap-3 @[18rem]:gap-3.5",
        "py-2 px-4 rounded-full backdrop-blur-sm",
        "@[18rem]:py-3 @[18rem]:px-5 @sm:py-4 @sm:px-6"
      )}
    >
      <ViewModeSelect />
      <hr className="hidden @sm:inline-block separator h-[1lh]" />
      <DateControls />
      <hr className="hidden @sm:inline-block separator h-[1lh]" />
      <button title="Add new event" onClick={openModal} type="button">
        <Plus />
      </button>
    </nav>
  );
}
