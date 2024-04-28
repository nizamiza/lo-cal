import Plus from "@/icons/plus";
import ViewModeSelect from "@/components/ViewModeSelect";
import DateControls from "@/components/DateControls";
import { useEventModalContext } from "@/contexts/EventModalContext";

export default function NavPanel() {
  const { openModal } = useEventModalContext();

  return (
    <nav
      className={`
        surface [--surface-alpha:0.8]
        sticky bottom-5 mt-auto mx-auto max-w-[calc(100vw-2rem)] z-90
        flex items-center justify-center gap-2 sm:gap-4
        p-4 sm:px-6 rounded-full backdrop-blur-md
      `}
    >
      <ViewModeSelect />
      <hr className="separator h-[1lh]" />
      <DateControls />
      <hr className="separator h-[1lh]" />
      <button title="Add new event" onClick={openModal}>
        <Plus />
      </button>
    </nav>
  );
}
