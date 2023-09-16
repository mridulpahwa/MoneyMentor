import {
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useEffect, useState } from "react";
import GPTMsg from "~/GPTMsg";
export default function Chat() {
  const [chat, setChat] = useState(["Amog us"]);

  useEffect(() => {
    // get some info from gpt and add it to the chat
  }, []);

  return (
    <div className="overflow-hidden !bg-transparent flex flex-col justify-between align-center !min-h-full">
      <MessageList
        className="!bg-slate-600 rounded-md p-2 mb-auto min-h-full"
        typingIndicator={
          <TypingIndicator
            className="!bg-slate-700 !w-full rounded-md"
            content="Lord GPT is thinking"
          />
        }
      >
        {...chat.map((msg, i) => <GPTMsg text={msg} key={i} />)}
      </MessageList>

      <MessageInput
        className="!bg-transparent"
        placeholder="Type message here..."
        autoFocus
        attachButton={false}
      />
    </div>
  );
}
