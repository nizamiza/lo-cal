import { cn } from "@/shared/utils";

export default function Footer() {
  return (
    <footer
      aria-label="App info"
      className={cn(
        "flex flex-col items-center justify-center gap-4 mx-auto text-sm",
        "px-2 pb-8 max-w-sm text-center"
      )}
    >
      <hr className="separator horizontal my-4" />
      <p>
        <kbd>lo-cal</kbd> is created by{" "}
        <a
          className="link"
          href="https://niza.cz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Niza
        </a>{" "}
        © {new Date().getFullYear()}. You can find the source code on{" "}
        <a
          className="link"
          href="https://github.com/nizamiza/lo-cal"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
