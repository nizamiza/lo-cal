import { usePreference } from "@/contexts/Preferences";
import Select from "@/components/Select";

const COLOR_OPTIONS = [
  "hotpink",
  "lightblue",
  "coral",
  "slateblue",
  "steelblue",
  "darkorange",
  "orchid",
  "dodgerblue",
  "firebrick",
  "goldenrod",
  "teal",
  "royalblue",
];

export default function BaseColorSelect() {
  const [baseColor, setBaseColor] = usePreference("base-color");

  return (
    <Select
      className="[&_select]:capitalize"
      onChange={(e) => setBaseColor((e.target as HTMLSelectElement).value)}
      value={baseColor}
      label="Select a base color"
      id="base-color-select"
      sr-only-label
    >
      {COLOR_OPTIONS.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </Select>
  );
}
