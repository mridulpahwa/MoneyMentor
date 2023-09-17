import { Avatar, Message } from "@chatscope/chat-ui-kit-react";

export default function GPTMsg({ text }) {
  return (
    <Message
      className="bg-transparent"
      model={{
        message: text,
        sender: "Jeff",
        direction: "incoming",
        position: "single",
      }}
    >
      <Avatar src={"/capital.svg"} name="Jeff" />
    </Message>
  );
}
