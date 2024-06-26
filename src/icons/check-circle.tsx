import IconBase, { IconBaseProps } from "@/icons/base";

type CheckCircleProps = IconBaseProps;

export default function CheckCircle(props: CheckCircleProps) {
  return (
    <IconBase {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </IconBase>
  );
}
