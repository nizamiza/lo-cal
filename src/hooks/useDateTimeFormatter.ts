import { usePreference } from "@/contexts/Preferences";

export default function useDateTimeFormatter(
  override: Intl.DateTimeFormatOptions = {}
) {
  const [dateTimeFormatLocale] = usePreference("date-time-format-locale");
  const [dateTimeFormat] = usePreference("date-time-format");

  return new Intl.DateTimeFormat(dateTimeFormatLocale, {
    ...dateTimeFormat,
    ...override,
  });
}
