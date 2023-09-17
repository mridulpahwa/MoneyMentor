import { Button } from "@mantine/core";
import { useSetAtom } from "jotai";
import {
  cheapAlternatives,
  economicAdvising,
  generalPlan,
  generateBudget,
  recommendCuts,
} from "~/gpt";
import { gptFuncAtom } from "./atoms";

export default function Choose() {
  const setGPTFunc = useSetAtom(gptFuncAtom);

  const click = (fn) => async () => {
    setGPTFunc(() => fn);
  };

  return (
    <div className="flex gap-4 flex-wrap">
      <Button size="xl" color="blue" onClick={click(generateBudget)}>
        Generate a budget
      </Button>
      <Button size="xl" color="blue" onClick={click(recommendCuts)}>
        Recommend ways to save money buy cheapening our
      </Button>
      <Button size="xl" color="blue" onClick={click(cheapAlternatives)}>
        Recommend some cheaper alternatives for spending habits
      </Button>
      <Button size="xl" color="blue" onClick={click(generalPlan)}>
        Recommend me a budget plan
      </Button>
      <Button size="xl" color="blue" onClick={click(economicAdvising)}>
        Recommend improving spending habits
      </Button>
    </div>
  );
}
