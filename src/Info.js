import { useAtomValue } from "jotai";
import { balanceAtom, lastExpenseAtom, pointsAtom } from "~/atoms";

export default function Info() {
  const balance = useAtomValue(balanceAtom);
  const points = useAtomValue(pointsAtom);
  const lastExpense = useAtomValue(lastExpenseAtom);

  return (
    <div className="flex gap-5 items-center text-xl">
      <h2 className="text-yellow-200">
        Points: <span>{points}</span>
      </h2>

      <h2 className="text-green-300">
        Balance: $<span>{balance}</span>
      </h2>

      <h2 className="text-red-500">
        Last Expense: - $<span>{lastExpense}</span>
      </h2>
    </div>
  );
}
