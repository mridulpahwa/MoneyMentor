import { Avatar, Message } from "@chatscope/chat-ui-kit-react";

export default function GPTMsg({ text }) {
  return (
    <Message
      className="bg-transparent"
      model={{
        message: text,
        sender: "GPT Helper",
        direction: "incoming",
        position: "single",
      }}
    >
      <Avatar src={"/openai.svg"} name="Eliot" />
    </Message>
  );
}
