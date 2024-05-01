import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  ReactNode,
  PropsWithChildren,
} from "react";
import { noop } from "@/shared/utils";

export type StatusMessageType = "info" | "success" | "warning" | "error";

type StatusMessage = {
  type: StatusMessageType;
  content: ReactNode;
  autoDisposeTimeout?: number | false;
};

type StatusMessageActionArgs =
  | ["add", StatusMessage]
  | ["remove", number]
  | ["clear"];

type StatusMessagesContextType = {
  messages: StatusMessage[];
  addMessage: (message: StatusMessage) => void;
  removeMessage: (index: number) => void;
  removeAll: () => void;
};

const StatusMessagesContext = createContext<StatusMessagesContextType>({
  messages: [],
  addMessage: noop,
  removeMessage: noop,
  removeAll: noop,
});

export function useStatusMessages(): StatusMessagesContextType {
  return useContext(StatusMessagesContext);
}

export default function StatusMessagesProvider({
  children,
}: PropsWithChildren) {
  const [messages, dispatch] = useReducer(
    (state: StatusMessage[], [type, payload]: StatusMessageActionArgs) => {
      switch (type) {
        case "add":
          return [...state, payload];
        case "remove":
          return state.filter((_, index) => index !== payload);
        case "clear":
          return [];
        default:
          return state;
      }
    },
    []
  );

  const removeMessage = useCallback((index: number) => {
    dispatch(["remove", index]);
  }, []);

  const addMessage = useCallback((message: StatusMessage) => {
    dispatch(["add", message]);
  }, []);

  const removeAll = useCallback(() => {
    dispatch(["clear"]);
  }, []);

  useEffect(() => {
    const timeouts: number[] = [];

    messages.forEach((message, index) => {
      if (message.autoDisposeTimeout === false) {
        return;
      }

      const duration = message.autoDisposeTimeout || 3000;

      timeouts.push(setTimeout(() => removeMessage(index), duration));
    });

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [messages, removeMessage]);

  return (
    <StatusMessagesContext.Provider
      value={{ messages, addMessage, removeMessage, removeAll }}
    >
      {children}
    </StatusMessagesContext.Provider>
  );
}
