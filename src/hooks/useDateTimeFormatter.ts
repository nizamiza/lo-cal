import { usePreference } from "@/contexts/Preferences";

export default function useDateTimeFormatter(
  override: Intl.DateTimeFormatOptions = {}
) {
  const [dateTimeFormat] = usePreference("date-time-format");

  return new Intl.DateTimeFormat([], {
    ...dateTimeFormat,
    ...override,
  });
}
