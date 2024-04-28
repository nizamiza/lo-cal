import { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export type IconBaseProps = SVGProps<SVGSVGElement>;

export default function IconBase({
  className,
  children,
  transform,
  ...props
}: IconBaseProps) {
  return (
    <svg
      className={twMerge("h-[1.5em] w-[1.5em]", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <g transform={transform}>{children}</g>
    </svg>
  );
}
