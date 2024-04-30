import { MouseEvent } from "react";
import { Event } from "@/event/types";
import MapPin from "@/icons/map-pin";
import LinkIcon from "@/icons/link";
import { usePreference } from "@/contexts/Preferences";
import { useEventModal } from "@/contexts/EventModal";
import { cn } from "@/shared/utils";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  const [viewMode] = usePreference("view-mode");
  const { setEvent } = useEventModal();

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setEvent(event);
  };

  return (
    <article
      onClick={handleClick}
      className={cn(
        viewMode !== "day" && "[--border-width:1px]",
        "pointer-events-none @[8rem]:pointer-events-auto @[8rem]:cursor-pointer",
        "surface bordered [--base-color:var(--bc-cim)] @xs:shadow-md",
        "grid gap-1 @[8rem]:p-2 @xs:gap-2 @sm:gap-4",
        "rounded-md @xs:rounded-lg"
      )}
    >
      <h3
        className={cn(
          "text-[0.375rem] @[2rem]:text-[0.5rem] @[4rem]:text-[0.675rem]",
          "leading-[1] line-clamp-1",
          "@xs:text-sm @sm:text-base @sm:line-clamp-2"
        )}
      >
        <span
          className={cn(
            "inline-block @[8rem]:hidden w-[0.5lh] mr-[0.125rem] mb-[0.125lh]",
            "aspect-square bg-current rounded-full"
          )}
          role="presentation"
        />
        {event.summary}
      </h3>
      <p className="hidden @xs:line-clamp-1 @sm:line-clamp-2 @md:line-clamp-3">
        {event.description}
      </p>
      <footer
        className={cn(
          "hidden @[8rem]:flex flex-wrap items-center gap-1 text-[0.625rem]",
          "@xs:text-sm @xs:gap-2 @sm:text-base @sm:gap-4"
        )}
      >
        <time dateTime={event.start}>
          {new Date(event.start).toLocaleTimeString("default", {
            hour: "numeric",
            minute: "2-digit",
          })}
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
