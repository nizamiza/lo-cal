import { useStatusMessages } from "@/contexts/StatusMessages";
import StatusMessage from "@/components/StatusMessage";
import Close from "@/icons/close";

export default function StatusMessageList() {
  const { messages, removeAll } = useStatusMessages();

  return (
    <section className="fixed bottom-4 right-4 left-4 z-[999] grid gap-4 justify-items-end">
      <h2 className="sr-only">Status Messages</h2>
      {messages.length > 2 && (
        <button
          className="text-sm py-2 px-3 rounded-md surface inline-flex items-center gap-2 leading-none"
          onClick={removeAll}
        >
          Clear All <Close className="h-4 w-4" />
        </button>
      )}
      <ul className="grid gap-3">
        {messages.map((message, index) => (
          <li key={index}>
            <StatusMessage type={message.type} id={index}>
              {message.content}
            </StatusMessage>
          </li>
        ))}
      </ul>
    </section>
  );
}
