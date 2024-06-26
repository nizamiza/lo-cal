import { useEffect, useRef, HTMLAttributes, ReactNode } from "react";
import Close from "@/icons/close";
import { cn } from "@/shared/utils";

type ModalProps = HTMLAttributes<HTMLDialogElement> & {
  open?: boolean;
  actions?: ReactNode;
  onClose?: () => void;
  "sr-only-title"?: boolean;
};

export default function Modal({
  className,
  children,
  open,
  title,
  actions,
  onClose,
  "sr-only-title": srOnlyTitle,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open]);

  return (
    <dialog
      className={cn("modal surface", className)}
      ref={dialogRef}
      onClose={onClose}
      {...props}
    >
      {srOnlyTitle ? (
        <h2 className="sr-only">{title}</h2>
      ) : (
        <header>
          {title && <h2>{title}</h2>}
          <form method="dialog">
            <button aria-label="Close" type="submit">
              <Close />
            </button>
          </form>
        </header>
      )}
      <div className="modal-content">{children}</div>
      {actions && (
        <>
          <hr className="separator horizontal my-4" />
          <footer className="modal-footer">{actions}</footer>
        </>
      )}
    </dialog>
  );
}
