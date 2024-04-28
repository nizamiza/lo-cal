import { deleteEvent } from "@/event/indexed-db";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useDeleteEvent() {
  const { addMessage } = useStatusMessages();

  return async (id: IDBValidKey) => {
    try {
      await deleteEvent(id);
      addMessage({
        type: "success",
        content: "Event deleted successfully.",
      });
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
