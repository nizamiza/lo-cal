import { usePreference, ViewMode } from "@/contexts/Preferences";
import Select from "@/components/Select";

const VIEW_MODE_OPTIONS = ["day", "week", "month"];

export default function ViewModeSelect() {
  const [viewMode, seViewMode] = usePreference("view-mode");

  return (
    <Select
      className="[&_select]:capitalize text-xs sm:text-sm md:text-base"
      onChange={(e) =>
        seViewMode((e.target as HTMLSelectElement).value as ViewMode)
      }
      defaultValue={viewMode}
      label="Select a view mode"
      id="view-mode-select"
      sr-only-label
    >
      {VIEW_MODE_OPTIONS.map((mode) => (
        <option key={mode} value={mode}>
          {mode}
        </option>
      ))}
    </Select>
  );
}
