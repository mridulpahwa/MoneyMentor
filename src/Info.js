import { useAtomValue } from "jotai";
import { balanceAtom, lastExpenseAtom, pointsAtom } from "~/atoms";

export default function Info() {
  const balance = useAtomValue(balanceAtom);
  const points = useAtomValue(pointsAtom);
  const lastExpense = useAtomValue(lastExpenseAtom);

  return (
    <div className="flex gap-5 items-center text-xl">
      <div className="text-yellow-200">
        Points: <span>{points}</span>
      </div>

      <div className="text-green-300">
        Balance: $<span>{balance}</span>
      </div>

      <LastExpense {...lastExpense} />
    </div>
  );
}

function LastExpense(expense) {
  return (
    <div className="flex gap-1 items-center">
      <div className="text-red-500">
        Last Expense: - $<span>{expense.amount}</span>
      </div>

      <div className="text-sm">
        <div className="text-slate-500">From: {expense.merchant}</div>
      </div>
    </div>
  );
}
