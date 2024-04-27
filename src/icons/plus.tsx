import IconBase, { IconBaseProps } from "@/icons/base";

type PlusProps = IconBaseProps;

export default function Plus(props: PlusProps) {
  return (
    <IconBase {...props}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </IconBase>
  );
}
