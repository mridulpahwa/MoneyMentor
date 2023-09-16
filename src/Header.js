import { Badge, Header as MantineHeader } from "@mantine/core";
import { useAtomValue } from "jotai";
import { cardNicknameAtom, cardTypeAtom } from "./atoms";

export default function Header() {
  const cardType = useAtomValue(cardTypeAtom);
  const nickname = useAtomValue(cardNicknameAtom);

  return (
    <MantineHeader height={60} p="xs">
      <div className="flex gap-5">
        <Badge size="xl">Card type: {cardType}</Badge>

        <Badge size="xl">Nickname: {nickname}</Badge>
      </div>
    </MantineHeader>
  );
}
