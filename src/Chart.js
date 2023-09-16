import { faker } from "@faker-js/faker";
import { Slider } from "@mantine/core";
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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getDatesInRange } from "./util";

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

const labels = getDatesInRange(10).reverse();

export const chartData = {
  labels,
  datasets: [
    {
      label: "Income",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Spending",
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function Chart() {
  const fullData = chartData;
  const [data, setData] = useState(fullData);
  const [weeksBack, setWeeksBack] = useState(4);

  useEffect(() => {
    const datasets = fullData.datasets.map((d) => ({
      ...d,
      data: d.data.slice(0, weeksBack).reverse(),
    }));

    const newData = {
      ...fullData,
      labels: getDatesInRange(weeksBack).reverse(),
      datasets,
    };
    setData(newData);
  }, [weeksBack]);

  return (
    <div className="flex flex-col gap-3 h-[100vh] w-[100vw] max-w-full max-h-full">
      <Line options={options} data={data} />
      <Slider
        value={weeksBack}
        onChange={setWeeksBack}
        max={fullData.datasets[0].data.length}
      />
    </div>
  );
}
