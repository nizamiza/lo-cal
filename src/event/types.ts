export type Event = {
  completed?: boolean;
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  url?: string;
};

export type EventFilter = Partial<Event>;
