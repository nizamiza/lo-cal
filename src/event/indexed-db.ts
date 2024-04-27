import { Event } from "@/event/types";

const DB_NAME = "calendar";
const DB_VERSION = 1.0;

enum Store {
  events = "events",
}

let db: IDBDatabase;

export function initDB(): Promise<IDBDatabase> {
  if (db) {
    return Promise.resolve(db);
  }

  db = await new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
    };
  });

  return db;
}

function wrapTransaction<T>(tx: IDBTransaction): Promise<T> {
  return new Promise((resolve, reject) => {
    tx.onerror = () => reject(tx.error);
    tx.oncomplete = () => resolve();
  });
}

function wrapRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addEvent(event: Event): Promise<number> {
  const db = await initDB();

  const tx = db.transaction(Store.events, "readwrite");
  const store = tx.objectStore(Store.events);

  const id = await wrapRequest(store.add(event));

  await wrapTransaction(tx);
  return id;
}

export async function getEvent(id: number): Promise<Event | undefined> {
  const db = await initDB();

  const tx = db.transaction(Store.events, "readonly");
  const store = tx.objectStore(Store.events);

  const event = await wrapRequest(store.get(id));

  await wrapTransaction(tx);
  return event;
}

export async function getEvents(): Promise<Event[]> {
  const db = await initDB();

  const tx = db.transaction(Store.events, "readonly");
  const store = tx.objectStore(Store.events);

  const events = await wrapRequest(store.getAll());

  await wrapTransaction(tx);
  return events;
}

export async function updateEvent(event: Event): Promise<void> {
  const db = await initDB();

  const tx = db.transaction(Store.events, "readwrite");
  const store = tx.objectStore(Store.events);

  await wrapRequest(store.put(event));
  await wrapTransaction(tx);
}

export async function deleteEvent(id: number): Promise<void> {
  const db = await initDB();

  const tx = db.transaction(Store.events, "readwrite");
  const store = tx.objectStore(Store.events);

  await wrapRequest(store.delete(id));
  await wrapTransaction(tx);
}