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
};

type StatusMessageActionArgs =
  | ["add", StatusMessage]
  | ["remove", number]
  | ["clear"];

type StatusMessagesContextType = {
  messages: StatusMessage[];
  addMessage: (message: StatusMessage) => void;
  removeMessage: (index: number) => void;
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
    [
      {
        type: "info",
        content: "This is a test info message to see how it looks.",
      },
      {
        type: "success",
        content: "This is a test success message to see how it looks.",
      },
      {
        type: "warning",
        content: "This is a test warning message to see how it looks.",
      },
      {
        type: "error",
        content: "This is a test error message to see how it looks.",
      },
    ]
  );

  const addMessage = (message: StatusMessage) => dispatch(["add", message]);
  const removeMessage = (index: number) => dispatch(["remove", index]);
  const removeAll = () => dispatch(["clear"]);

  return (
    <StatusMessagesContext.Provider
      value={{ messages, addMessage, removeMessage, removeAll }}
    >
      {children}
    </StatusMessagesContext.Provider>
  );
}
