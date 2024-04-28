import { HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import LabelText from "@/components/LabelText";
import CalendarIcon from "@/icons/calendar";

type InputAttributes = HTMLAttributes<HTMLInputElement>;

type FormFieldProps = Pick<
  InputAttributes,
  "type" | "inputMode" | "defaultValue" | "required"
> & {
  className?: string;
  element?: "input" | "textarea";
  label: string;
  id: string;
  rows?: number;
  placeholder?: string;
};

export default function FormField({
  className,
  element = "input",
  label,
  id,
  required,
  defaultValue,
  placeholder,
  type,
  inputMode,
  rows = 7,
}: FormFieldProps) {
  const [value, setValue] = useState(defaultValue);

  const isFirefox =
    typeof navigator !== "undefined" && navigator.userAgent.includes("Firefox");

  return (
    <div className={twMerge("form-field", className)}>
      <label htmlFor={id}>
        <LabelText>{label}</LabelText>
      </label>
      {element === "input" ? (
        <span className="relative leading-0">
          <input
            id={id}
            name={id}
            required={required}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            inputMode={inputMode}
            onChange={(event) => setValue(event.target.value)}
          />
          {!isFirefox && (
            <>
              {type?.startsWith("date") && value && (
                <span className="absolute top-1/2 left-2 -translate-y-1/2">
                  {new Date(value).toLocaleDateString()}
                </span>
              )}
              {type?.startsWith("date") && (
                <CalendarIcon className="h-4 w-4 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
              )}
            </>
          )}
        </span>
      ) : (
        <textarea
          id={id}
          name={id}
          required={required}
          defaultValue={defaultValue}
          rows={rows}
        />
      )}
    </div>
  );
}
