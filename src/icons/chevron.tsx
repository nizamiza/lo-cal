import IconBase, { IconBaseProps } from "@/icons/base";

export type ChevronProps = IconBaseProps & {
  direction?: "up" | "down" | "left" | "right";
};

export default function Chevron({
  direction = "left",
  ...props
}: ChevronProps) {
  const rotationAngle =
    direction === "up"
      ? 90
      : direction === "down"
        ? 270
        : direction === "right"
          ? 180
          : 0;

  return (
    <IconBase {...props} transform={`rotate(${rotationAngle} 12 12)`}>
      <polyline points="15 18 9 12 15 6"></polyline>
    </IconBase>
  );
}
