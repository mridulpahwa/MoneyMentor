import { RangeSlider } from "@mantine/core";
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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { accountAtom } from "./atoms";
import { getDatesBetween, splitChargesDaily } from "./util";

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
    legend: {
      labels: {
        color: "#60a5fa", // Change the color of all labels to red
      },
    },
    options: {
      scales: {
        x: {
          beginAtZero: true,
          color: "#60a5fa",
          // You can add further X-axis customization here if needed
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  },
};

export default function Chart() {
  const account = useAtomValue(accountAtom);
  const income = account.deposits;
  const spending = [...account.charges, ...account.bills];

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const arr = [...income, ...spending].sort((a, b) =>
    dayjs(b.date, format).diff(dayjs(a.date, format))
  );
  const minDate = dayjs(arr[arr.length - 1].date, format);
  const maxDate = dayjs(arr[0].date, format);

  const initialLabels = getDatesBetween(minDate, dayjs()).map((a) =>
    a.format("MM/DD/YYYY")
  );

  const initialIncome = splitChargesDaily(income, maxDate);
  const [splitIncome, setSplitIncome] = useState(initialIncome);

  const initialSplitSpending = splitChargesDaily(spending, maxDate);
  const [splitSpending, setSplitSpending] = useState(initialSplitSpending);

  console.log({
    initialSplitSpending,
    initialIncome,
    income,
    spending,
  });

  const chartData = {
    labels: initialLabels,
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
        color: "blue", // Change the color of this specific label to blue
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

  const [labels, setLabels] = useState(initialLabels);

  const [data, setData] = useState(chartData);
  const maxRange = maxDate.diff(minDate, "days");
  const [range, setRange] = useState([1, 7]);

  useEffect(() => {
    const datasets = chartData.datasets.map((d) => ({
      ...d,
      data: d.data.slice(range[0], range[1]),
    }));

    const newData = {
      ...chartData,
      labels: getDatesBetween(
        minDate.add(range[0], "days"),
        minDate
          .add(Math.ceil((range[1] - range[0]) / 7), "weeks")
          .add(range[0], "days")
      ).map((a) => a.format("MM/DD/YYYY")),
      datasets,
    };
    setData(newData);
  }, [range]);

  return (
    <div className="flex flex-col gap-3 h-[100vh] w-[100vw] max-w-full max-h-full">
      <Line options={options} data={data} />

      <div className="w-[400px] border-2 rounded border-blue-400 p-5">
        <div>Days before today to show income and losses on graph</div>
        <RangeSlider
          defaultValue={range}
          onChange={(values) => setRange(values)}
          min={1}
          max={maxRange}
          minRange={1}
        />
      </div>
    </div>
  );
}
