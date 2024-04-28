import { useState, FormEvent } from "react";
import { Event as CalendarEvent } from "@/event/types";
import useAddEvent from "@/hooks/useAddEvent";
import useDeleteEvent from "@/hooks/useDeleteEvent";
import useUpdateEvent from "@/hooks/useUpdateEvent";
import { getFormDataStringValue } from "@/shared/utils";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import Trash from "@/icons/trash";

type EventModalProps = {
  id?: number;
  event?: CalendarEvent | null;
  open?: boolean;
  onClose?: () => void;
};

const FORM_ID = "event-form";

export default function EventModal({
  id,
  event,
  open,
  onClose,
}: EventModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const calendarEvent = [
      "summary",
      "start",
      "description",
      "location",
      "url",
    ].reduce(
      (data, key) => ({
        ...data,
        [key]: getFormDataStringValue(formData, key),
      }),
      {} as CalendarEvent,
    );

    const startDate = new Date(calendarEvent.start);
    const endDate = new Date(startDate);

    endDate.setHours(startDate.getHours() + 0.5);

    calendarEvent.end = endDate.toISOString();

    if (id) {
      await updateEvent(id, calendarEvent);
    } else {
      await addEvent(calendarEvent);
    }

    onClose?.();
  };

  const handleDelete = async () => {
    if (id) {
      await deleteEvent(id);
      onClose?.();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={id ? "Edit Event" : "Add Event"}
      actions={
        <>
          <button className="btn surface" type="submit" form={FORM_ID}>
            {id ? "Update" : "Add"}
          </button>
          {onClose && (
            <button className="btn" type="button" onClick={onClose}>
              Cancel
            </button>
          )}
        </>
      }
    >
      <form className="form" onSubmit={handleSubmit} id={FORM_ID}>
        <FormField
          label="Summary"
          id="summary"
          defaultValue={event?.summary}
          placeholder="Event name"
          required
        />
        <FormField
          label="Date"
          id="start"
          type="datetime-local"
          defaultValue={event?.start}
          required
        />
        <FormField
          element="textarea"
          label="Description"
          id="description"
          placeholder="Event description"
          defaultValue={event?.description}
        />
        <FormField
          label="Location"
          id="location"
          placeholder="Event location"
          defaultValue={event?.location}
        />
        <FormField
          label="URL"
          id="url"
          defaultValue={event?.url}
          placeholder="https://example.com"
          inputMode="url"
        />
      </form>
      {id && (
        <button
          aria-label="Delete the event"
          type="button"
          onClick={() => setIsDeleting(true)}
        >
          <Trash />
        </button>
      )}
      {isDeleting && (
        <dialog open>
          <h2 className="sr-only">Confirm event deletion</h2>
          <p>Are you sure you want to delete this event?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setIsDeleting(false)}>Cancel</button>
        </dialog>
      )}
    </Modal>
  );
}
