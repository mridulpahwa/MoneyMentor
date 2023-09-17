import {
  Avatar,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { customerAtom, gptFuncAtom } from "./atoms";
import { getNextResponse, getResponse } from "./gpt";

export default function Messages() {
  const [chat, setChat] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [gptMessages, setGptMessages] = useState([]);
  const gptFunc = useAtomValue(gptFuncAtom);
  const customer = useAtomValue(customerAtom);

  useEffect(() => {
    (async () => {
      if (!gptFunc || !customer) return;

      setWaiting(true);
      const { msg, messages } = await getResponse(customer, gptFunc);
      debugger;
      setChat([
        {
          message: msg,
          sender: "Jeff",
        },
      ]);
      setGptMessages(messages);
      setWaiting(false);
    })();
  }, [gptFunc, customer]);

  async function onSend(value) {
    setChat((prev) => [...prev, { message: value, sender: "You" }]);
    setWaiting(true);
    const newGptMsgs = [...gptMessages, { role: "user", content: value }];
    const { msg } = await getNextResponse(newGptMsgs);
    setWaiting(false);
    setChat((prev) => [...prev, { message: msg, sender: "Jeff" }]);
    setGptMessages(newGptMsgs);
  }

  return (
    <div className="overflow-hidden !bg-transparent flex flex-col justify-between align-center !min-h-full">
      <MessageList
        className="!bg-slate-600 rounded-md mb-auto"
        typingIndicator={
          waiting ? (
            <TypingIndicator
              className="!bg-slate-700 !w-full rounded-md !text-xs"
              content="Jeff is thinking"
            />
          ) : null
        }
      >
        {...chat.map((props, i) => {
          const isJeff = props.sender === "Jeff";

          return (
            <Message
              className="bg-transparent !rounded-md"
              model={{
                ...props,
                direction: isJeff ? "Incoming" : null,
                position: "single",
              }}
              key={i}
            >
              {isJeff && <Avatar src={"/capital.svg"} name="Jeff" />}
            </Message>
          );
        })}
      </MessageList>

      {!waiting && (
        <MessageInput
          className="!bg-transparent"
          placeholder="Type message here..."
          autoFocus
          attachButton={false}
          onSend={onSend}
        />
      )}
    </div>
  );
}
