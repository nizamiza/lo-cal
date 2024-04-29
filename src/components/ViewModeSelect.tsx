import { usePreference, ViewMode } from "@/contexts/Preferences";
import Select from "@/components/Select";

const VIEW_MODE_OPTIONS = ["day", "week", "month"];

export default function ViewModeSelect() {
  const [viewMode, setViewMode] = usePreference("view-mode");

  return (
    <Select
      className="[&_select]:capitalize text-xs @xs:text-sm @sm:text-base"
      onChange={(e) =>
        setViewMode((e.target as HTMLSelectElement).value as ViewMode)
      }
      value={viewMode}
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
