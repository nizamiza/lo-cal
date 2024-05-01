import { HTMLAttributes, ChangeEvent, UIEvent, useMemo } from "react";
import LabelText from "@/components/LabelText";
import useDateTimeFormatter from "@/hooks/useDateTimeFormatter";
import Chevron from "@/icons/chevron";
import CheckIcon from "@/icons/check";
import { cn, isValidDate } from "@/shared/utils";

type InputAttributes = HTMLAttributes<HTMLInputElement>;

export type FormFieldSelectOption = {
  value: string;
  label: string;
};

export type FormFieldProps = {
  className?: string;
  element?: "input" | "textarea" | "select";
  "aria-label"?: string;
  label?: string;
  id: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  maxLength?: number;
  onClick?: (event: UIEvent) => void;
  onChange?: (value: string, checked: boolean) => void;
  inputMode?: InputAttributes["inputMode"];
  type?: "text" | "number" | "date" | "datetime-local" | "checkbox" | "search";
  options?: FormFieldSelectOption[];
};

export default function FormField({
  className,
  element = "input",
  "aria-label": ariaLabel,
  label,
  id,
  required,
  disabled,
  defaultValue,
  value,
  checked,
  onClick,
  onChange,
  placeholder,
  maxLength,
  type = "text",
  inputMode,
  rows = 7,
  options,
}: FormFieldProps) {
  const dateTimeFormatter = useDateTimeFormatter();

  const isDateType = type.startsWith("date");

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    onChange?.(target.value, target.checked || false);
  };

  const dateValue = useMemo(() => {
    if (!isDateType) return value;

    let date = new Date(value || "");

    if (!isValidDate(date)) {
      date = new Date();
    }

    const offset = date.getTimezoneOffset() * 60000;
    const correctedDate = new Date(date.getTime() - offset);

    return correctedDate.toISOString().slice(0, 16);
  }, [isDateType, value]);

  const commonProps = {
    "aria-label": ariaLabel,
    id,
    name: id,
    required,
    disabled,
    defaultValue,
    value: isDateType ? dateValue : value,
    onClick,
    onChange: handleChange,
  };

  return (
    <div className={cn("form-field", className)}>
      {label && (
        <label htmlFor={id}>
          <LabelText className="inline-flex items-center gap-2 flex-wrap">
            {label}
            {isDateType && dateValue && (
              <span className="text-xs">
                ({dateTimeFormatter.format(new Date(dateValue))})
              </span>
            )}
          </LabelText>
        </label>
      )}
      {element === "input" ? (
        <span className="relative flex">
          <input
            {...commonProps}
            placeholder={placeholder}
            type={type}
            inputMode={inputMode}
            checked={checked}
            maxLength={maxLength}
          />
          {type === "checkbox" && checked && (
            <CheckIcon
              className={cn(
                "absolute w-[1.25em] h-[1.25em] top-[0.15em] left-[0.125em]",
                "pointer-events-none"
              )}
            />
          )}
        </span>
      ) : element === "select" ? (
        <div className="flex items-center relative">
          <select {...commonProps}>
            {options?.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <Chevron
            direction="down"
            className="h-4 w-4 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      ) : (
        <textarea {...commonProps} rows={rows} maxLength={maxLength} />
      )}
    </div>
  );
}
