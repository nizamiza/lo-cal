import IconBase, { IconBaseProps } from "@/icons/base";

type SearchProps = IconBaseProps;

export default function Search(props: SearchProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </IconBase>
  );
}
