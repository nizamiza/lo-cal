import { HTMLAttributes, ChangeEvent } from "react";
import LabelText from "@/components/LabelText";
import useDateTimeFormatter from "@/hooks/useDateTimeFormatter";
import Chevron from "@/icons/chevron";
import CheckIcon from "@/icons/check";
import { cn } from "@/shared/utils";

type InputAttributes = HTMLAttributes<HTMLInputElement>;

export type FormFieldSelectOption = {
  value: string;
  label: string;
};

export type FormFieldProps = {
  className?: string;
  element?: "input" | "textarea" | "select";
  label: string;
  id: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  value?: string;
  checked?: boolean;
  onChange?: (value: string, checked: boolean) => void;
  inputMode?: InputAttributes["inputMode"];
  type?: "text" | "number" | "date" | "datetime-local" | "checkbox" | "search";
  options?: FormFieldSelectOption[];
};

export default function FormField({
  className,
  element = "input",
  label,
  id,
  required,
  disabled,
  defaultValue,
  value,
  checked,
  onChange,
  placeholder,
  type = "text",
  inputMode,
  rows = 7,
  options,
}: FormFieldProps) {
  const dateTimeFormatter = useDateTimeFormatter();

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    onChange?.(target.value, target.checked || false);
  };

  const isDateType = type.startsWith("date");

  return (
    <div className={cn("form-field", className)}>
      <label htmlFor={id}>
        <LabelText className="inline-flex items-center gap-2 flex-wrap">
          {label}
          {isDateType && value && (
            <span className="text-xs">
              ({dateTimeFormatter.format(new Date(value))})
            </span>
          )}
        </LabelText>
      </label>
      {element === "input" ? (
        <span className="relative flex">
          <input
            id={id}
            name={id}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            inputMode={inputMode}
            onChange={handleChange}
            value={isDateType ? value?.slice(0, 16) : value}
            checked={checked}
          />
          {type === "checkbox" && value && (
            <CheckIcon className="absolute top-1 left-1 pointer-events-none" />
          )}
        </span>
      ) : element === "select" ? (
        <div className="flex items-center relative">
          <select
            id={id}
            name={id}
            required={required}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleChange}
            value={value}
          >
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
        <textarea
          id={id}
          name={id}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          rows={rows}
          onChange={handleChange}
          value={value}
        />
      )}
    </div>
  );
}
