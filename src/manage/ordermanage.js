import * as React from "react";
import { useEffect, useState } from "react";
import OrderServices from "../based/services/OrderServices";
import TableCustom from "../based/table";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { BATCH_MODE } from "../based/Constants";
import Common from "../based/Common";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

const configHeader = [
  "ID",
  "Order Date",
  "Expected Date",
  "Price",
  "Delivery Date",
  "Batch Mode",
  "Shipper Id",
  "Image",
];

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);
  const [formGetOrder, setFormGetOrder] = useState({
    id: "F02ED09C-BB53-4AC9-9341-629B0FAF1422",
    BatchMode: BATCH_MODE.TRUNKIN,
    size: paging.size,
    page: paging.page,
  });

  useEffect(() => {
    handleGetOrderByBatchMode();
  }, []);

  const handleGetOrderByBatchMode = async () => {
    const [err, data] = await OrderServices.GetOrdersByBatchMode(formGetOrder);
    if (!err) {
      const temp = [];
      data.items.map((item) => {
        temp.push([
          item.id,
          format(new Date(item.orderDate), "dd/MM/yyyy hh:mm"),
          format(new Date(item.expectedDateOfDelivery), "dd/MM/yyyy"),
          item.price,
          format(new Date(item.deliveryDate), "dd/MM/yyyy hh:mm"),
          item.batchMode,
          item.batchId,
          item.img,
        ]);
      });
      console.log(temp);
      setOrders(temp);
    } else {
      console.log(err);
    }
  };

  console.log(orders);

  return (
    <>
      <Card>
        <CardContent>
          <TableCustom
            data={configHeader}
            header={configHeader}
            body={orders && orders.length > 0 && orders}
          />
          <div className="flex justify-end">
            <Button type="submit">Share Order</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
