import { usePreference } from "@/contexts/Preferences";

export default function useDateTimeFormatter() {
  const [dateTimeFormat] = usePreference("date-time-format");
  return new Intl.DateTimeFormat([], dateTimeFormat);
}
