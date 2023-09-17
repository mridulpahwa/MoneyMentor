import {
  Avatar,
  Message,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Button, LoadingOverlay } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons-react";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { customerAtom, gptFuncAtom } from "./atoms";
import { getResponse } from "./gpt";

export default function Messages() {
  const [chat, setChat] = useState([]);
  const [waiting, setWaiting] = useState(false);
  const [gptMessages, setGptMessages] = useState([]);
  const [gptFunc, setGptFunc] = useAtom(gptFuncAtom);
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
      setGptMessages([messages, { role: "assistant", content: msg }]);
      setWaiting(false);
    })();
  }, [gptFunc, customer]);

  return (
    <div className="overflow-hidden !bg-transparent flex flex-col justify-between align-center !min-h-full relative">
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
              className="bg-transparent !rounded-md text-xl"
              model={{
                ...props,
                direction: isJeff ? "incoming" : null,
                position: "single",
              }}
              key={i}
            >
              {isJeff && <Avatar src={"/capital.svg"} name="Jeff" />}
            </Message>
          );
        })}
      </MessageList>

      <Button leftIcon={<IconArrowBack />} onClick={() => setGptFunc(null)}>
        Ask another question
      </Button>
      <LoadingOverlay visible={waiting} overlayBlur={0.3} />
    </div>
  );
}
