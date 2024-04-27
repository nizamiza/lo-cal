import { usePreference } from "@/contexts/Preferences";
import Select from "@/components/Select";

const VIEW_MODE_OPTIONS = ["day", "week", "month"];

export default function ViewModeSelect() {
  const [viewMode, seViewMode] = usePreference("view-mode");

  return (
    <Select
      className="[&_select]:capitalize"
      onChange={(e) => seViewMode(e.target.value)}
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
