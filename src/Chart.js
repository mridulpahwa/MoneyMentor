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
import { useAtomValue } from "jotai";
import moment from "moment";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import { accountDepositsAtom, accountSpendingAtom } from "./atoms";
import { getDatesInRange, splitChargesWeekly } from "./util";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

// export const chartData = {
//   labels,
//   datasets: [
//     {
//       label: "Spending",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       tension: 0.2,
//       borderWidth: 5,
//     },
//     {
//       label: "Income",
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: "rgb(48, 201, 69)",
//       backgroundColor: "rgba(48, 201, 69, 0.5)",
//       tension: 0.2,
//       borderWidth: 5,
//     },
//   ],
// };

export default function Chart() {
  // const fullData = chartData;
  const income = useAtomValue(accountDepositsAtom);
  const spending = useAtomValue(accountSpendingAtom);

  const format = "MM/DD/YYYY";
  const arr = [...income, ...spending].sort((a, b) => {
    return moment(b.date, format) - moment(a.date, format);
  });
  const minDate = moment(arr[arr.length - 1].date, format);

  const weeks = moment().diff(minDate, "weeks");
  // console.log({ weeks, maxDate: minDate });

  const splitIncome = useState(
    splitChargesWeekly(
      income.map((a) => a.amount),
      minDate
    )
  );
  const splitSpending = useState(
    splitChargesWeekly(
      spending.map((a) => a.amount),
      minDate
    )
  );

  const labels = getDatesInRange(0, weeks);

  // console.log({ splitIncome, splitSpending });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Spending",
        data: splitSpending,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2,
        borderWidth: 5,
      },
      {
        label: "Income",
        data: splitIncome,
        borderColor: "rgb(48, 201, 69)",
        backgroundColor: "rgba(48, 201, 69, 0.5)",
        tension: 0.2,
        borderWidth: 5,
      },
    ],
  };

  // const [data, setData] = useState(chartData);
  // const [range, setRange] = useState([1, weeks]);

  // useEffect(() => {
  //   const datasets = chartData.datasets.map((d) => ({
  //     ...d,
  //     data: d.data.slice(range[0], range[1]),
  //   }));

  //   const newData = {
  //     ...chartData,
  //     labels: getDatesInRange(0, range[1]),
  //     datasets,
  //   };
  //   setData(newData);
  // }, [range]);

  // console.log(fullData.datasets[0].data.length);

  return (
    <div className="flex flex-col gap-3 h-[100vh] w-[100vw] max-w-full max-h-full">
      <Line options={options} data={chartData} />

      {/* <RangeSlider
        defaultValue={range}
        onChange={(values) => setRange(values)}
        min={1}
        max={weeks}
      /> */}
    </div>
  );
}
