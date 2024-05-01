import { useStatusMessages } from "@/contexts/StatusMessages";
import StatusMessage from "@/components/StatusMessage";
import Close from "@/icons/close";
import { cn } from "@/shared/utils";

export default function StatusMessageList() {
  const { messages, removeAll } = useStatusMessages();

  return (
    <section
      className={cn(
        "fixed left-4 top-4 right-4 z-[999]",
        "grid gap-4 justify-items-center rounded-lg p-2",
        messages.length === 0 && "pointer-events-none"
      )}
    >
      <h2 className="sr-only">Status Messages</h2>
      <ul className="grid gap-3 justify-items-center">
        {messages.map((message, index) => (
          <li key={index}>
            <StatusMessage type={message.type} id={index}>
              {message.content}
            </StatusMessage>
          </li>
        ))}
      </ul>
      {messages.length > 2 && (
        <button
          className="text-sm py-2 px-3 rounded-md surface inline-flex items-center gap-2 leading-none"
          onClick={removeAll}
          type="button"
        >
          Clear All <Close className="h-4 w-4" />
        </button>
      )}
    </section>
  );
}
