import { Event } from "@/event/types";
import { deleteEvent } from "@/event/indexed-db";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useDeleteEvent() {
  const { addMessage } = useStatusMessages();

  return async (event: Event, silent?: boolean) => {
    try {
      await deleteEvent(event);

      if (!silent) {
        addMessage({
          type: "success",
          content: "Event deleted successfully.",
        });
      }
    } catch (error) {
      logError(error, () => {
        addMessage({
          type: "error",
          content: "Failed to delete event.",
        });
      });
    }
  };
}
