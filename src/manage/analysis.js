import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { useLoading } from "../based/context/LoadingContext";
import OrderServices from "../based/services/OrderServices";
import WareHouseServices from "../based/services/WareHouseServices";
import { BarChart } from "../based/Chart";
import Common from "../based/Common";
import { BATCH_MODE, ROLE } from "../based/Constants";
import { TableCustom } from "../based/table/TableComponent";
import { format } from "date-fns";
const config = {
  datasets: [
    {
      label: "Analysis Orders",
      labels: ["Total Orders", "Orders Success", "Order Imported"],
      data: [0, 0, 0],
    },
  ],
};

const OrderHeader = [
  {
    id: 1,
    name: "Batch TRUCKIN",
    icon: <PackageIcon />,
    value: "0",
  },
  {
    id: 2,
    name: "Batch IMPORTED",
    icon: <CircleCheckIcon />,
    value: "0",
  },
];

export const _renderHeader = (props) => {
  const { totalOrder, orderSuccess, orderImported } = props;
  const [dataHeader, setDataHeader] = useState(OrderHeader);
  useEffect(() => {
    dataHeader.map((item) =>
      item.id === 1
        ? (item.value = totalOrder)
        : item.id === 2
        ? (item.value = orderSuccess)
        : (item.value = orderImported)
    );
  }, [props]);
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dataHeader.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{item.name}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold flex text-align items-center justify-between">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default function Analysis() {
  const [totalOrder, setTotalOrder] = useState({
    totalOrder: 0,
    orderSuccess: 0,
  });
  const navigate = useNavigate();
  const [paging, setPaging] = useState({ page: 1, size: 10 });
  const [barChart, setBarChart] = useState(config);
  const { showLoading, hideLoading } = useLoading();
  const [listData, setListData] = useState([]);
  useEffect(() => {
    showLoading();
    const totalOrderAPI = { ...totalOrder };
    const fetchData = async () => {
      let id = Common.GetInfo("id");
      let model = {
        id: id,
        page: 1,
        batchmode: BATCH_MODE.TRUCKIN,
        size: 10,
      };
      let model2 = {
        id: id,
        page: 1,
        batchmode: BATCH_MODE.IMPORTED,
        size: 10,
      };
      const [err, data] = await OrderServices.GetListBatchByWarehouse(model);
      if (!err) {
        totalOrderAPI.totalOrder = data.total;
      } else {
        console.log("err", err);
      }
      const [err1, data1] = await OrderServices.GetListBatchByWarehouse(model2);
      if (!err1) {
        totalOrderAPI.orderSuccess = data1.total;
      } else {
        console.log("err", err1);
      }
      const [err2, data2] = await OrderServices.GetOrderImported();
      if (!err2) {
        totalOrderAPI.orderImported = data2.total;
      } else {
        console.log("err", err2);
      }
      setTotalOrder(totalOrderAPI);
      setBarChart({
        datasets: [
          {
            label: "Analysis Orders",
            labels: ["Batch Truckin", "Batch Imported"],
            data: [totalOrderAPI.totalOrder, totalOrderAPI.orderSuccess],
          },
        ],
      });
      hideLoading();
    };
    fetchData();
    handleGetOrderSuccess();
  }, []);

  const handleGetOrderSuccess = async () => {
    let id = Common.GetInfo("id");
    let model = {
      id: id,
      page: paging.page,
      size: paging.size,
    };
    const [err, data] = await WareHouseServices.GetOrderSuccessByWareHouse(
      model
    );
    if (!err) {
      let temp = [];
      data.items.map((item, index) => {
        const orderDateFormat = format(item.orderDate, "dd/MM/yyyy");
        const deliveryDateFormat = format(item.deliveryDate, "dd/MM/yyyy");
        const expectedDateOfDeliveryFormat = format(
          item.expectedDateOfDelivery,
          "dd/MM/yyyy"
        );
        // i want add "$" in the end of price
        const price = item.price + " VNĐ";
        temp.push([
          index + 1,
          orderDateFormat,
          expectedDateOfDeliveryFormat,
          price,
          deliveryDateFormat,
          item.cusName,
          item.address,
          item.phoneNumber,
          item.img_Shipper,
          item.status,
          item.shipperId,
          item.batchId,
        ]);
        setListData(temp);
      });
      console.log("data", data);
    } else {
      console.log("err", err);
    }
  };

  const headerTable = [
    "Id",
    "Order Date",
    "Expected Date",
    "Price",
    "DeliveryDate",
    "CusName",
    "Address",
    "Phone",
    "Image",
    "Status",
    "ShipperId",
    "BatchId",
  ];

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <h3 style={{ fontSize: "20px" }} className="font-bold">
          Thống kê lượng đơn hàng trong kho
        </h3>

        <main className="flex grid gap-8 p-4 md:p-6">
          {_renderHeader(totalOrder)}
        </main>
        <h3 style={{ fontSize: "20px" }} className="font-bold">
          Thống kê lượng lượng đơn hàng giao thành công
        </h3>
        <TableCustom header={headerTable} body={listData} />

        <h3 style={{ fontSize: "20px" }} className="font-bold">
          Biểu đồ theo dõi
        </h3>
        <div
          style={{
            width: "80%",
            display: "flex",
            alignItems: "center",
          }}
          className=" flex items-center justify-between"
        >
          <div style={{ width: "40%", display: "flex" }} className="bar-chart">
            {" "}
            <BarChart data={barChart} />
          </div>
        </div>
      </div>
    </>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function LinkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
