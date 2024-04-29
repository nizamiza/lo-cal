import { Event } from "@/event/types";
import EventCard from "@/components/EventCard";

type CalendarDayEventsProps = {
  events: Event[];
};

export default function CalendarDayEvents({ events }: CalendarDayEventsProps) {
  return (
    <ol className="grid gap-1 w-full">
      {events.map((event, index) => (
        <li className="@container" key={index}>
          <EventCard event={event} />
        </li>
      ))}
    </ol>
  );
}
