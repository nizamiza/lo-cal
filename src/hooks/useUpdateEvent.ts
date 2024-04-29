import { updateEvent } from "@/event/indexed-db";
import { Event } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useUpdateEvent() {
  const { addMessage } = useStatusMessages();

  return async (event: Event) => {
    try {
      await updateEvent(event);
      addMessage({
        type: "success",
        content: "Event updated successfully.",
      });
    } catch (error) {
      logError(error, () => {
        addMessage({
          type: "error",
          content: "Failed to update event.",
        });
      });
    }
  };
}
