import { PropsWithChildren, ReactNode } from "react";
import {
  StatusMessageType,
  useStatusMessages,
} from "@/contexts/StatusMessages";
import Alert from "@/icons/alert";
import AlertOctagon from "@/icons/alert-octagon";
import CheckCircle from "@/icons/check-circle";
import Info from "@/icons/info";
import Close from "@/icons/close";

const ICON_MAP: Record<StatusMessageType, ReactNode> = {
  success: <CheckCircle />,
  error: <Alert />,
  warning: <AlertOctagon />,
  info: <Info />,
};

type StatusMessageProps = PropsWithChildren<{
  type: StatusMessageType;
  id: number;
}>;

export default function StatusMessage({
  type,
  id,
  children,
}: StatusMessageProps) {
  const { removeMessage } = useStatusMessages();

  return (
    <dialog
      className={`
        surface [--surface-alpha:0.85] backdrop-blur-sm
        flex items-start gap-3 p-3 rounded-lg static h-auto m-0 max-w-[40ch]
        leading-[1]
        ${type === "info" ? "[--base-color:steelblue]" : ""}
        ${type === "success" ? "[--base-color:green]" : ""}
        ${type === "warning" ? "[--base-color:orange]" : ""}
        ${type === "error" ? "[--base-color:red]" : ""}
      `}
      open
    >
      {ICON_MAP[type]}
      <div className="mt-1">{children}</div>
      <form method="dialog">
        <button
          aria-label="Close message"
          onClick={() => removeMessage(id)}
          type="submit"
        >
          <Close />
        </button>
      </form>
    </dialog>
  );
}
