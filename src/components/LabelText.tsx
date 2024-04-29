import { HTMLAttributes } from "react";
import { cn } from "@/shared/utils";

type LabelTextProps = HTMLAttributes<HTMLSpanElement>;

export default function LabelText({
  className,
  children,
  ...props
}: LabelTextProps) {
  return (
    <span className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </span>
  );
}
