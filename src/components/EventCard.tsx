import { UIEvent, useState, useEffect } from "react";
import FormField from "@/components/FormField";
import { usePreference } from "@/contexts/Preferences";
import { useEventModal } from "@/contexts/EventModal";
import { useEvents } from "@/contexts/Events";
import { Event as CalendarEvent } from "@/event/types";
import useUpdateEvent from "@/hooks/useUpdateEvent";
import useDateTimeFormatter from "@/hooks/useDateTimeFormatter";
import MapPin from "@/icons/map-pin";
import LinkIcon from "@/icons/link";
import { cn } from "@/shared/utils";

type EventCardProps = {
  event: CalendarEvent;
  onClick?: () => void;
};

export default function EventCard({ event, onClick }: EventCardProps) {
  const [isCompleted, setIsCompleted] = useState(event.completed);

  const [viewMode] = usePreference("view-mode");
  const { setEvent } = useEventModal();

  const { refreshEvents } = useEvents();
  const updateEvent = useUpdateEvent();

  const timeFormatter = useDateTimeFormatter({
    dateStyle: undefined,
  });

  const handleClick = (e: UIEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (onClick) {
      onClick();
    } else {
      setEvent(event);
    }
  };

  useEffect(() => {
    setIsCompleted(event.completed);
  }, [event.completed]);

  return (
    <article
      data-id={event.id}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleClick(e);
        }
      }}
      tabIndex={0}
      className={cn(
        viewMode !== "day" && "[--border-width:1px]",
        "pointer-events-none @[9rem]:pointer-events-auto @[9rem]:cursor-pointer",
        "surface bordered [--base-color:var(--bc-cim)] @xs:shadow-md",
        "grid gap-1 p-0.5 @[9rem]:p-2 @xs:gap-2 @sm:gap-4",
        "rounded-md @xs:rounded-lg",
        event.completed && "opacity-80"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "hidden @[15rem]:flex",
            "text-[0.675rem] @xs:text-sm @sm:text-base"
          )}
        >
          <FormField
            aria-label="Completed"
            id={`completed-${event.id}`}
            type="checkbox"
            checked={isCompleted}
            onClick={(e) => e.stopPropagation()}
            onChange={(_, completed) => {
              setIsCompleted(completed);
              updateEvent({ ...event, completed }, true).then(refreshEvents);
            }}
          />
        </div>
        <h3
          className={cn(
            "text-[0.375rem] @[2rem]:text-[0.5rem] @[4rem]:text-[0.675rem]",
            "leading-[1] line-clamp-1",
            "@xs:text-sm @sm:text-base @sm:line-clamp-2",
            event.completed && "line-through"
          )}
        >
          <span
            className={cn(
              "inline-block @[9rem]:hidden w-[0.5lh] mr-[0.125rem] mb-[0.125lh]",
              "aspect-square bg-current rounded-full"
            )}
            role="presentation"
          />
          {event.summary}
        </h3>
      </div>
      <p className="hidden @xs:line-clamp-1 @sm:line-clamp-2 @md:line-clamp-3">
        {event.description}
      </p>
      <footer
        className={cn(
          "hidden @[9rem]:flex flex-wrap items-center gap-1 text-[0.625rem]",
          "@xs:text-sm @xs:gap-2 @sm:text-base @sm:gap-4"
        )}
      >
        <time dateTime={event.start}>
          {timeFormatter.format(new Date(event.start))}
        </time>
        {event.location && (
          <p
            className="flex items-center gap-1 @sm:gap-2"
            title={event.location}
          >
            <MapPin className="w-[1em] h-[1em]" />
            <span
              className={cn(
                "hidden text-ellipsis overflow-hidden whitespace-nowrap",
                "@xs:inline @xs:max-w-[20ch] @sm:max-w-[30ch]"
              )}
            >
              {event.location}
            </span>
          </p>
        )}
        {event.url && (
          <a
            aria-label="Event link"
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto"
          >
            <LinkIcon className="w-[1em] h-[1em]" />
          </a>
        )}
      </footer>
    </article>
  );
}
