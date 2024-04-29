import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Modal from "@/components/Modal";
import SettingsIcon from "@/icons/settings";

type SettingsProps = {
  className?: string;
};

export default function Settings({ className }: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <button aria-label="Open settings" type="button">
        <SettingsIcon />
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
      ></Modal>
    </div>
  );
}
