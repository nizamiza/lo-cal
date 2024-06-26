import IconBase, { IconBaseProps } from "@/icons/base";

type InfoProps = IconBaseProps;

export default function Info(props: InfoProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </IconBase>
  );
}
