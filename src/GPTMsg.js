import { Avatar, Message } from "@chatscope/chat-ui-kit-react";

export default function GPTMsg(props) {
  return (
    <Message
      className="bg-transparent !rounded-md"
      model={{
        ...props,
        position: "single",
      }}
    >
      <Avatar src={"/capital.svg"} name="Jeff" />
    </Message>
  );
}
