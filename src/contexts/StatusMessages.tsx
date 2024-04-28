import {
  createContext,
  useContext,
  useReducer,
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
    [],
  );

  const removeMessage = (index: number) => {
    dispatch(["remove", index]);
  };

  const addMessage = (message: StatusMessage) => {
    dispatch(["add", message]);

    if (message.autoDisposeTimeout === false) {
      return;
    }

    const timeout = message.autoDisposeTimeout || 3000;
    const index = messages.length;

    setTimeout(() => {
      removeMessage(index);
    }, timeout);
  };

  const removeAll = () => {
    dispatch(["clear"]);
  };

  return (
    <StatusMessagesContext.Provider
      value={{ messages, addMessage, removeMessage, removeAll }}
    >
      {children}
    </StatusMessagesContext.Provider>
  );
}
