# lo-cal

**lo-cal** is a simple calendar app that stores events and settings locally in
the browser using the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
and [`indexedDB`](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) APIs.

Website: [lo-cal.fly.dev](https://lo-cal.fly.dev)

## Features

-   Add, edit, and delete events
-   Change the calendar view between day, week, and month
-   Change the first day of the week
-   Change the main color theme
-   Everything is stored locally!

## Caveats

-   Events are stored in the browser's `localStorage` and `indexedDB` APIs, so
    they will not be synced across devices or browsers.
-   You cannot share nor invite others to events. This is a personal calendar app
    only for you.

> **Note:** This app is mainly made as a demo and for personal use.

## Tech Stack

-   [React](https://react.dev)
-   [TypeScript](https://typescriptlang.org)
-   [Tailwind CSS](https://tailwindcss.com)
-   [Vite](https://vitejs.dev)

## Development

1. Clone the repository:

    ```sh
    git clone https://github.com/nizamiza/lo-cal.git
    ```

2. Install the dependencies:

    ```sh
    cd lo-cal
    bun install
    ```

3. Start the development server:

    ```sh
    bun run dev
    ```

## License

Read the [LICENSE](LICENSE) file for more information.
