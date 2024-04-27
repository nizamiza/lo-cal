export type Event = {
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  url?: string;
};

export type EventFilter = Partial<Event>;
