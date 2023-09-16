import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { accountDepositsAtom, accountSpendingAtom } from "./atoms";
import { getDatesBetween, splitChargesDaily } from "./util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const format = "MM/DD/YYYY";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export default function Chart() {
  const income = useAtomValue(accountDepositsAtom);
  const spending = useAtomValue(accountSpendingAtom);

  const arr = [...income, ...spending].sort((a, b) =>
    dayjs(b.date, format).diff(dayjs(a.date, format))
  );
  const minDate = dayjs(arr[arr.length - 1].date, format);
  const maxDate = dayjs(arr[0].date, format);

  const labels = getDatesBetween(minDate, dayjs()).map((a) =>
    a.format("MM/DD/YYYY")
  );

  const initialIncome = splitChargesDaily(income, maxDate);
  const [splitIncome, setSplitIncome] = useState(initialIncome);

  const initialSplitSpending = splitChargesDaily(spending, maxDate);
  const [splitSpending, setSplitSpending] = useState(initialSplitSpending);

  console.log({ initialSplitSpending, initialIncome, income, spending });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Spending",
        data: splitSpending.map((a) =>
          a.map((b) => b.amount).reduce((partialSum, a) => partialSum + a, 0)
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
        borderWidth: 3,
      },
      {
        label: "Income",
        data: splitIncome.map((a) =>
          a.map((b) => b.amount).reduce((partialSum, a) => partialSum + a, 0)
        ),
        borderColor: "rgb(48, 201, 69)",
        backgroundColor: "rgba(48, 201, 69, 0.5)",
        tension: 0.2,
        borderWidth: 3,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}
