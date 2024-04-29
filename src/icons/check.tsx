import IconBase, { IconBaseProps } from "@/icons/base";

type CheckProps = IconBaseProps;

export default function Check(props: CheckProps) {
  return (
    <IconBase {...props}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </IconBase>
  );
}
