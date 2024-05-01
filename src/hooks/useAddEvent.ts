import { addEvent } from "@/event/indexed-db";
import { EventCreateInput } from "@/event/types";
import { useStatusMessages } from "@/contexts/StatusMessages";
import { logError } from "@/shared/utils";

export default function useAddEvent() {
  const { addMessage } = useStatusMessages();

  return async (event: EventCreateInput, silent = false) => {
    try {
      await addEvent(event);

      if (!silent) {
        addMessage({
          type: "success",
          content: "Event added successfully.",
        });
      }
    } catch (error) {
      logError(error, () => {
        addMessage({
          type: "error",
          content: "Failed to add event.",
        });
      });
    }
  };
}
