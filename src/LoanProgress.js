import { Progress } from "@mantine/core";

export default function LoanProgress({
  totalAmount,
  remainingAmount,
  amountPerMonth,
  name,
}) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h2 className="text-lg font-bold">{name}</h2>
      <Progress
        size="xl"
        value={(remainingAmount / totalAmount) * 100}
        striped
        animate
      />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          Left:{" "}
          <span className="font-semibold text-green-300">
            ${remainingAmount}
          </span>
          / ${totalAmount}
        </div>
        <div className="flex gap-2">
          Next Month:{" "}
          <span className="font-semibold text-red-400">${amountPerMonth}</span>
        </div>
      </div>
    </div>
  );
}
