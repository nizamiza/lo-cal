import { HTMLAttributes } from "react";

export type IconBaseProps = HTMLAttributes<SVGElement>;

export default function IconBase({
  children,
  transform,
  ...props
}: IconBaseProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
