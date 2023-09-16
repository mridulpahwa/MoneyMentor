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

      <LastExpense {...lastExpense} />
    </div>
  );
}

function LastExpense(expense) {
  return (
    <div className="flex gap-1 items-center">
      <h2 className="text-red-500">
        Last Expense: - $<span>{expense.amount}</span>
      </h2>

      <div className="text-sm">
        <h3 className="text-slate-500">From: {expense.merchant}</h3>
      </div>
    </div>
  );
}
