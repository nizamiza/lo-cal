import { addEvent } from "@/event/indexed-db";
import { Event } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useAddEvent() {
  const { addMessage } = useStatusMessages();

  return async (event: Event) => {
    try {
      await addEvent(event);
      addMessage({
        type: "success",
        content: "Event added successfully.",
      });
    } catch (error) {
      logError(error, (error) => {
        addMessage({
          type: "error",
          content: "Failed to add event.",
        });
      });
    }
  };
}
