import { createContext, useContext, useState, PropsWithChildren } from "react";
import { noop } from "@/shared/utils";

type PreferenceMap = {
  "color-scheme": "light" | "dark";
  "view-mode": "day" | "week" | "month";
  timezone: string;
  "last-viewed-date": string;
  "first-day-of-week": 0 | 1 | 2 | 3 | 4 | 5 | 6;
  "date-time-format": {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "narrow" | "short" | "long";
    day: "numeric" | "2-digit";
    hour: "numeric" | "2-digit";
    minute: "numeric" | "2-digit";
    second: "numeric" | "2-digit";
  };
};

const DEFAULT_PREFERENCES: PreferenceMap = {
  "color-scheme": "light",
  "view-mode": "month",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  "last-viewed-date": new Date().toISOString(),
  "first-day-of-week": 0,
  "date-time-format": {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  },
};

const LOCAL_STORAGE_KEY = "preferences";

type PreferenceKey = keyof PreferenceMap;
type SetPreference = <const K extends PreferenceKey>(
  key: K,
  value: PreferenceMap[K]
) => void;

type SetSpecificPreference<K extends PreferenceKey> = (
  value: PreferenceMap[K]
) => void;

type PreferencesContextType = {
  preferences: PreferenceMap;
  setPreference: SetPreference;
  resetPreference: (key: PreferenceKey) => void;
};

const PreferencesContext = createContext<PreferencesContextType>({
  preferences: DEFAULT_PREFERENCES,
  setPreference: noop,
  resetPreference: noop,
});

export function usePreferences(): PreferencesContextType {
  return useContext(PreferencesContext);
}

export function usePreference<const K extends PreferenceKey>(
  key: K
): [PreferenceMap[K], SetSpecificPreference<K>] {
  const { preferences, setPreference } = usePreferences();
  return [preferences[key], (value) => setPreference(key, value)];
}

function getLocalPreferences(override?: Partial<PreferenceMap>): PreferenceMap {
  const storedPreferences = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) || "{}"
  );

  return {
    ...DEFAULT_PREFERENCES,
    ...storedPreferences,
    ...override,
  };
}

function setLocalPreference<const K extends PreferenceKey>(
  key: K,
  value: PreferenceMap[K]
): PreferenceMap {
  const newPreferences = getLocalPreferences({ [key]: value });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newPreferences));
  return newPreferences;
}

function resetLocalPreference(key: PreferenceKey): PreferenceMap {
  return setLocalPreference(key, DEFAULT_PREFERENCES[key]);
}

export default function PreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState(() => {
    return getLocalPreferences();
  });

  const setPreference: SetPreference = (key, value) => {
    setPreferences(() => {
      return setLocalPreference(key, value);
    });
  };

  const resetPreference = (key: PreferenceKey) => {
    setPreferences(() => {
      return resetLocalPreference(key);
    });
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, setPreference, resetPreference }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
