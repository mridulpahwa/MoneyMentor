import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { format } from "./Chart3";
import { accountDepositsAtom, accountSpendingAtom } from "./atoms";

export default function IncomeAndBills() {
  const income = useAtomValue(accountDepositsAtom);
  const spending = useAtomValue(accountSpendingAtom);

  const mappedIncome = income.map((a) => ({ ...a, type: "income" }));
  const mappedSpending = spending.map((a) => ({ ...a, type: "spending" }));
  const combind = [...mappedIncome, ...mappedSpending].sort((a, b) =>
    dayjs(b.date, format).diff(dayjs(a.date, format))
  );

  return (
    <ul className="flex flex-col gap-2 w-full !text-2xl">
      {combind.map((item, i) => (
        <li key={i} className="flex flex-row justify-between">
          <span>
            {item.type === "income" ? (
              <span>
                + <span className="text-green-400">{item.amount}</span>
              </span>
            ) : (
              <span>
                - <span className="text-red-400">{item.amount}</span>
              </span>
            )}{" "}
          </span>
          <span className="flex gap-4">
            <span>{item.name ?? item.merchant}</span>
            <span>{item.date}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
