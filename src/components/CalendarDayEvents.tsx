import { Event } from "@/event/types";
import MapPin from "@/icons/map-pin";
import LinkIcon from "@/icons/link";

type CalendarDayEventsProps = {
  events: Event[];
};

export default function CalendarDayEvents({ events }: CalendarDayEventsProps) {
  return (
    <ol className="flex flex-col gap-1">
      {events.map((event, index) => (
        <li key={index} className="text-[0.625rem] sm:text-xs md:text-sm">
          <article
            className={`
              surface [--base-color:var(--base-light)]
              flex flex-col gap-1 p-1 sm:p-2 rounded-md
              shadow-md
            `}
          >
            <h3 className="text-xs truncate">{event.summary}</h3>
            <p>{event.description}</p>
            <footer class="flex flex-row justify-start flex-wrap items-center gap-2">
              <time dateTime={event.start}>
                {new Date(event.start).toLocaleTimeString("default", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </time>
              {event.location && (
                <span className="flex items-center gap-1">
                  <MapPin />
                  {event.location}
                </span>
              )}
              {event.url && (
                <a
                  aria-label="Event link"
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto"
                >
                  <LinkIcon />
                </a>
              )}
            </footer>
          </article>
        </li>
      ))}
    </ol>
  );
}
