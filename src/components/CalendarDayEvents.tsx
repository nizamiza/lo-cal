import { useEffect, useState, useRef } from "react";
import { Event } from "@/event/types";
import EventCard from "@/components/EventCard";
import { usePreference } from "@/contexts/Preferences";

type CalendarDayEventsProps = {
  events: Event[];
};

export default function CalendarDayEvents({ events }: CalendarDayEventsProps) {
  const [viewMode] = usePreference("view-mode");

  const [threshold, setThreshold] = useState(viewMode === "month" ? 1 : 2);

  const shouldTruncate =
    ["month", "week"].includes(viewMode) && events.length > threshold;

  const truncatedEvents = shouldTruncate ? events.slice(0, threshold) : events;
  const truncatedEventCount = events.length - truncatedEvents.length;

  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const containerElement = listRef.current?.parentElement;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { height } = entry.contentRect;

        if (height > 0) {
          setThreshold(Math.floor(height / 64));
        }
      });
    });

    if (containerElement) {
      resizeObserver.observe(containerElement);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ol
      className="flex flex-col gap-1 @sm:gap-2 @md:gap-3 w-full"
      ref={listRef}
    >
      {truncatedEvents.map((event, index) => (
        <li className="@container" key={index}>
          <EventCard event={event} />
        </li>
      ))}
      {truncatedEventCount > 0 && (
        <li
          className="text-[0.375rem] @[3rem]:text-[0.5rem] @xs:text-xs text-center"
          title={`There are ${truncatedEventCount} more events`}
        >
          <span className="hidden @[4rem]:inline">+</span>
          {truncatedEventCount}
          <span className="hidden @[4rem]:inline"> more</span>
          <span className="@[4rem]:hidden">
            {" "}
            event{truncatedEventCount > 1 && "s"}
          </span>
        </li>
      )}
    </ol>
  );
}
