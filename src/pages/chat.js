import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useAtomValue } from "jotai";
import Choose from "~/Choose";
import Messages from "~/Messages";
import { gptFuncAtom } from "~/atoms";
export default function Chat() {
  const gpt = useAtomValue(gptFuncAtom);

  return gpt ? <Messages /> : <Choose />;
}
