import { useState } from "react";
import Modal from "@/components/Modal";
import { usePreference } from "@/contexts/Preferences";

export default function IntroModal() {
  const [showIntro, setShowIntro] = usePreference("show-welcome-message");
  const [isOpen, setIsOpen] = useState(showIntro);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    setShowIntro(false);
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      title="Welcome to lo-cal!"
      actions={
        <>
          <button onClick={handleDontShowAgain} className="btn surface">
            Dismiss and don't show again!
          </button>
          <button onClick={handleClose} className="btn">
            Got it!
          </button>
        </>
      }
    >
      <p>
        This is a simple calendar app that allows you to view and manage your
        events. Everything is stored locally! So 100% privacy, but you also
        can't access your events from other devices nor share them with others.
      </p>
      <p>
        You can switch between day, week, and month views using the controls in
        the bottom navigation panel.
      </p>
      <p>
        To create an event, click on the "+" button in the corner of the
        navigation panel. You can then fill out the details and save it to your
        calendar.
      </p>
      <p>
        To edit or delete an event, click on the event in the calendar view. You
        can then make your changes and save them.
      </p>
      <p>
        You can access additional settings by clicking on the gear icon in the
        top right corner.
      </p>
      <p>That's it! Enjoy using lo-cal! 😊</p>
    </Modal>
  );
}
