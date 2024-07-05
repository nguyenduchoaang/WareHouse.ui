import { BarChart, LineChart } from "../based/Chart";

const config = {
  datasets: [
    {
      label: "Doanh thu 6 tháng đầu năm (triệu đồng)",
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
      ],
      data: [65, 59, 80, 81, 56, 55],
    },
  ],
};
const configLineChart = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  datasets: [
    {
      label: "Doanh thu 6 tháng đầu năm",
      data: [20, 59, 80, 81, 56, 55],
    },
  ],
};

const Analysis = () => {
  return (
    <>
      <BarChart data={config} />
      <LineChart data={configLineChart} />
    </>
  );
};
