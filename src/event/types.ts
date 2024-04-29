export type Event = {
  id: IDBValidKey;
  completed?: boolean;
  summary: string;
  description?: string;
  location?: string;
  start: string;
  end: string;
  url?: string;
};

export type EventCreateInput = Omit<Event, "id" | "completed">;
