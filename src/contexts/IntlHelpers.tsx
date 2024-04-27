import { createContext, useContext, useState, PropsWithChildren } from "react";
import { usePreference } from "@/contexts/Preferences";

type IntlHelpersContextType = {
  dateTimeFormatter: Intl.DateTimeFormat;
};

const IntlHelpersContext = createContext<IntlHelpersContextType>({
  dateTimeFormatter: new Intl.DateTimeFormat(),
});

export function useIntlHelpers() {
  return useContext(IntlHelpersContext);
}

export default function IntlHelpersProvider({ children }: PropsWithChildren) {
  const [dateTimeFormat] = usePreference("date-time-format");
  const [intl] = useState(() => ({
    dateTimeFormatter: new Intl.DateTimeFormat([], dateTimeFormat),
  }));

  return (
    <IntlHelpersContext.Provider value={intl}>
      {children}
    </IntlHelpersContext.Provider>
  );
}
