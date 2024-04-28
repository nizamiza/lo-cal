import { usePreference } from "@/contexts/Preferences";

export default function TodayButton() {
  const [, setLastViewedDate] = usePreference("last-viewed-date");

  const handleClick = () => {
    setLastViewedDate(new Date().toISOString());
  };

  return (
    <button className="btn surface sm" onClick={handleClick}>
      Today
    </button>
  );
}
