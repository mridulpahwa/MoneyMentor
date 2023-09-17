import Chart from "~/Chart3";
import IncomeAndBills from "~/IncomeAndBills";
import Info from "~/Info";

export default function Home() {
  return (
    <main className="mt-5 flex flex-col gap-4 items-center">
      <Info />

      <Chart />

      <IncomeAndBills />
    </main>
  );
}
