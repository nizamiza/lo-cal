import IconBase, { IconBaseProps } from "@/icons/base";

type MapPinProps = IconBaseProps;

export default function MapPin(props: MapPinProps) {
  return (
    <IconBase {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </IconBase>
  );
}
