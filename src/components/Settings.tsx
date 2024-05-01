import { useState, useEffect, FormEvent } from "react";
import Modal from "@/components/Modal";
import FormField, { FormFieldProps } from "@/components/FormField";
import {
  usePreferences,
  PreferenceMap,
  DEFAULT_PREFERENCES,
} from "@/contexts/Preferences";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { useEvents } from "@/contexts/Events";
import { useNav } from "@/contexts/Nav";
import { WEEK_DAYS } from "@/hooks/useWeekDays";
import useDeleteEvent from "@/hooks/useDeleteEvent";
import SettingsIcon from "@/icons/settings";
import { cn } from "@/shared/utils";

type SettingsProps = {
  className?: string;
};

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

type SettingFormFieldProps = Partial<
  Omit<FormFieldProps, "value" | "onChange" | "id">
>;

type NestedSettingFormFieldProps = {
  legend: string;
  fields: Record<string, SettingFormFieldProps>;
};

const SettingFieldProps = {
  "show-welcome-message": {
    type: "checkbox",
    label: "Show welcome message",
    disabled: false,
  },
  "base-color": {
    type: "text",
    label: "Color theme",
    element: "select",
    options: COLOR_OPTIONS.map((color) => ({ value: color, label: color })),
    disabled: false,
  },
  "view-mode": {
    type: "text",
    label: "View mode",
    element: "select",
    disabled: true,
    options: ["day", "week", "month"].map((mode) => ({
      value: mode,
      label: mode,
    })),
  },
  timezone: {
    type: "text",
    label: "Timezone",
    disabled: true,
  },
  "last-viewed-date": {
    type: "datetime-local",
    label: "Last viewed date",
    disabled: true,
  },
  "first-day-of-week": {
    type: "number",
    label: "First day of week",
    element: "select",
    disabled: false,
    options: WEEK_DAYS.map((day, index) => ({
      value: index.toString(),
      label: day,
    })),
  },
  "show-time": {
    type: "checkbox",
    label: "Show time",
    disabled: false,
  },
  "date-time-format-locale": {
    type: "text",
    label: "Date time format locale",
    element: "select",
    disabled: false,
    options: Array.from(
      new Set([
        navigator.language,
        "en-US",
        "en-GB",
        "de-DE",
        "fr-FR",
        "es-ES",
        "sk-SK",
        "cs-CZ",
        "zh-CN",
        "ja-JP",
        "ko-KR",
      ]).values()
    ).map((locale) => ({
      value: locale,
      label: locale,
    })),
  },
} satisfies Record<string, SettingFormFieldProps>;

const NestedSettingFieldProps = {
  "date-time-format": {
    legend: "Date time format",
    fields: {
      dateStyle: {
        label: "Date style",
        element: "select",
        options: ["long", "medium", "short"].map((style) => ({
          value: style,
          label: style,
        })),
      },
      timeStyle: {
        label: "Time style",
        element: "select",
        options: ["long", "medium", "short"].map((style) => ({
          value: style,
          label: style,
        })),
      },
    },
  },
} satisfies Record<string, NestedSettingFormFieldProps>;

type SettingFieldKey = keyof typeof SettingFieldProps;
type NestedSettingFieldKey = keyof typeof NestedSettingFieldProps;

const FORM_ID = "settings-form";

export default function Settings({ className }: SettingsProps) {
  const { settingsIsOpen, closeSettings, openSettings } = useNav();

  const [isDeleting, setIsDeleting] = useState(false);

  const { events, refreshEvents } = useEvents();
  const deleteEvent = useDeleteEvent();

  const { preferences, setPreferences, resetPreferences } = usePreferences();

  const [formValues, setFormValues] =
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    useState<Record<string, any>>(preferences);

  const { addMessage } = useStatusMessages();

  const handleClose = () => {
    setIsDeleting(false);
    closeSettings();
  };

  const handleChange = (key: string, subKey?: string) => {
    return (value: string, checked: boolean) => {
      const resolvedValue =
        SettingFieldProps[key as SettingFieldKey]?.type === "checkbox"
          ? checked
          : value;

      setFormValues((prevValues) => ({
        ...prevValues,
        [key]: subKey
          ? { ...prevValues[key], [subKey]: resolvedValue }
          : resolvedValue,
      }));
    };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreferences(formValues as PreferenceMap);

    addMessage({
      type: "success",
      content: "Settings saved!",
    });

    closeSettings();
  };

  const handleReset = () => {
    resetPreferences();
    setFormValues(DEFAULT_PREFERENCES);

    addMessage({
      type: "info",
      content: "Settings were reset.",
    });

    closeSettings();
  };

  const handleDeleteAllEvents = async () => {
    const eventCount = events.length;

    await Promise.all(events.map((event) => deleteEvent(event, true)));

    addMessage({
      type: "warning",
      content: `${eventCount} events were deleted.`,
    });

    refreshEvents();
    closeSettings();
  };

  useEffect(() => {
    setFormValues(preferences);
  }, [preferences]);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <button
        className="btn p-1.5"
        aria-label="Open settings"
        type="button"
        onClick={openSettings}
      >
        <SettingsIcon />
      </button>
      <Modal
        open={settingsIsOpen}
        onClose={handleClose}
        title={isDeleting ? "Delete all events" : "Settings"}
        actions={
          isDeleting ? (
            <>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setIsDeleting(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleDeleteAllEvents}
                type="button"
              >
                Yes
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn bordered"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                form={FORM_ID}
                className="btn surface ml-auto"
              >
                Save
              </button>
              <button
                type="button"
                className="btn bordered"
                onClick={handleClose}
              >
                Cancel
              </button>
            </>
          )
        }
      >
        {isDeleting ? (
          <p>
            Are you sure you want to delete all events? This action cannot be
            undone!
          </p>
        ) : (
          <>
            <form id={FORM_ID} onSubmit={handleSubmit}>
              {Object.entries(DEFAULT_PREFERENCES)
                .filter(
                  ([key]) =>
                    !SettingFieldProps[key as SettingFieldKey]?.disabled
                )
                .map(([key, value]) => {
                  if (key in NestedSettingFieldProps) {
                    const castedKey = key as NestedSettingFieldKey;

                    return (
                      <fieldset key={`settings-item-${key}`}>
                        <legend>
                          {NestedSettingFieldProps[castedKey].legend}
                        </legend>
                        {Object.keys(value).map((subKey) => (
                          <FormField
                            key={`settings-item-${key}-${subKey}`}
                            id={`${key}.${subKey}`}
                            value={formValues[key][subKey]}
                            checked={Boolean(formValues[key][subKey])}
                            onChange={handleChange(key, subKey)}
                            {...NestedSettingFieldProps[castedKey].fields[
                              subKey as keyof (typeof NestedSettingFieldProps)[typeof castedKey]["fields"]
                            ]}
                          />
                        ))}
                      </fieldset>
                    );
                  }

                  return (
                    <FormField
                      key={`settings-item-${key}`}
                      id={key}
                      value={formValues[key]}
                      checked={Boolean(formValues[key])}
                      onChange={handleChange(key)}
                      {...SettingFieldProps[key as SettingFieldKey]}
                    />
                  );
                })}
            </form>
            <button
              className="btn bordered self-start"
              onClick={() => setIsDeleting(true)}
              type="button"
            >
              Delete all events
            </button>
          </>
        )}
      </Modal>
    </div>
  );
}
