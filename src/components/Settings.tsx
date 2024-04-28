import { useState } from "react";
import Modal from "@/components/Modal";
import SettingsIcon from "@/icons/settings";

export default function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button aria-label="Open settings" type="button">
        <SettingsIcon />
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Settings"
      ></Modal>
    </>
  );
}
