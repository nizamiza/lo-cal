import { useState, useEffect, FormEvent } from "react";
import {
  Event as CalendarEvent,
  EventCreateInput as CalendarEventCreateInput,
} from "@/event/types";
import useAddEvent from "@/hooks/useAddEvent";
import useDeleteEvent from "@/hooks/useDeleteEvent";
import useUpdateEvent from "@/hooks/useUpdateEvent";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { usePreference } from "@/contexts/Preferences";
import Trash from "@/icons/trash";

type EventModalProps = {
  event?: CalendarEvent | null;
  open?: boolean;
  onClose?: () => void;
};

const FORM_ID = "event-form";

function getEventDefaultValues(
  lastViewedDate: string,
  event?: CalendarEvent | null,
): CalendarEventCreateInput {
  return {
    summary: event?.summary || "",
    start: event?.start || lastViewedDate || "",
    end: event?.end || "",
    description: event?.description || "",
    location: event?.location || "",
    url: event?.url || "",
  };
}

export default function EventModal({ event, open, onClose }: EventModalProps) {
  const [lastViewedDate] = usePreference("last-viewed-date");

  const [formValues, setFormValues] = useState<CalendarEventCreateInput>(
    getEventDefaultValues(lastViewedDate, event),
  );

  const [isDeleting, setIsDeleting] = useState(false);

  const id = event?.id;

  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const handleFormFieldChange = (key: keyof CalendarEventCreateInput) => {
    return (value: string) => {
      setFormValues((prevValues) => ({
        ...prevValues,
        [key]: value,
      }));
    };
  };

  const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const calendarEvent = {
      ...event,
      ...formValues,
    } as CalendarEvent;

    const startDate = new Date(calendarEvent.start);
    const endDate = new Date(startDate);

    endDate.setHours(startDate.getHours() + 0.5);

    calendarEvent.end = endDate.toISOString();

    if (id) {
      await updateEvent(calendarEvent);
    } else {
      await addEvent(calendarEvent);
    }

    setFormValues(getEventDefaultValues(lastViewedDate, event));
    onClose?.();
  };

  const handleDelete = async () => {
    if (id) {
      await deleteEvent(event);

      setIsDeleting(false);
      onClose?.();
    }
  };

  useEffect(() => {
    setFormValues(getEventDefaultValues(lastViewedDate, event));
  }, [event, lastViewedDate]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isDeleting ? "Delete event" : id ? "Edit event" : "Add new event"}
      actions={
        isDeleting ? (
          <>
            <button className="btn" onClick={handleDelete} type="button">
              Yes
            </button>
            <button
              className="btn"
              onClick={() => setIsDeleting(false)}
              type="button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {id && (
              <button
                className="btn border-[1.5px]"
                aria-label="Delete the event"
                type="button"
                onClick={() => setIsDeleting(true)}
              >
                <Trash />
              </button>
            )}
            <button
              className="btn surface ml-auto"
              type="submit"
              form={FORM_ID}
            >
              {id ? "Update" : "Add"}
            </button>
            {onClose && (
              <button
                className="btn border-[1.5px]"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
          </>
        )
      }
    >
      {isDeleting ? (
        <p>
          Are you sure you want to delete the event{" "}
          <strong>{event?.summary}</strong>?
        </p>
      ) : (
        <>
          <form className="form" onSubmit={handleSubmit} id={FORM_ID}>
            <FormField
              label="Summary"
              id="summary"
              placeholder="Event name"
              required
              value={formValues?.summary}
              onChange={handleFormFieldChange("summary")}
            />
            <FormField
              label="Date"
              id="start"
              type="datetime-local"
              required={!formValues?.start}
              value={formValues?.start}
              onChange={handleFormFieldChange("start")}
            />
            <FormField
              element="textarea"
              label="Description"
              id="description"
              placeholder="Event description"
              value={formValues?.description}
              onChange={handleFormFieldChange("description")}
            />
            <FormField
              label="Location"
              id="location"
              placeholder="Event location"
              value={formValues?.location}
              onChange={handleFormFieldChange("location")}
            />
            <FormField
              label="URL"
              id="url"
              placeholder="https://example.com"
              inputMode="url"
              value={formValues?.url}
              onChange={handleFormFieldChange("url")}
            />
          </form>
        </>
      )}
    </Modal>
  );
}
