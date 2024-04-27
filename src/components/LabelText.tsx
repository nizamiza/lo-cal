import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type LabelTextProps = HTMLAttributes<HTMLSpanElement>;

export default function LabelText({
  className,
  children,
  ...props
}: LabelTextProps) {
  return (
    <span className={twMerge("text-sm font-semibold", className)} {...props}>
      {children}
    </span>
  );
}
