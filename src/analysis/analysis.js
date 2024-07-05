import { BarChart, LineChart } from "../based/Chart";
import { _renderHeader } from "../homepage/homepage";
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
      label: "Đơn hàng 6 tháng đầu năm",
      data: [20, 59, 80, 81, 56, 55],
    },
  ],
};

export default function Analysis() {
  return (
    <>
      <_renderHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ width: "100%", height: "50%", marginTop: "10%" }}
          className="d-flex justify"
        >
          Doanh thu <BarChart data={config} />
        </div>
        <div
          style={{ width: "100%", marginTop: "10%" }}
          className="d-flex justify"
        >
          Đơn hàng 6 tháng đầu năm <LineChart data={configLineChart} />
        </div>
      </div>
    </>
  );
}
