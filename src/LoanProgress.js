import { Progress } from "@mantine/core";

export default function LoanProgress({ total, left, nextMonth, name }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold">{name}</h2>
      <Progress size="xl" value={(left / total) * 100} striped animate />;
      <div className="flex gap-2">
        <div className="flex gap-2">
          Left: <span className="font-semibold text-green-300">${left}</span>
        </div>
        <div className="flex gap-2">
          Next Month:{" "}
          <span className="font-semibold text-red-400">${nextMonth}</span>
        </div>
      </div>
    </div>
  );
}
