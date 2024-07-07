import * as React from "react";
import { useEffect, useState } from "react";
import OrderServices from "../based/services/OrderServices";
import TableCustom from "../based/table";
import { Card, CardContent } from "../components/ui/card";
import { BATCH_MODE } from "../based/Constants";
import Common from "../based/Common";
import { format } from "date-fns";
import Confirm from "../based/Confirm";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
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
      setOrders(temp);
    } else {
      console.log(err);
    }
  };

  const handleUpdateBatchMode = async () => {
    const id = Common.GetInfo("id");
    console.log(id);
    const [err, data] = await OrderServices.UpdateBatchModeById(id);
    if (!err) {
      console.log("sucess");
      console.log(data);
    } else {
      console.log(err);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <TableCustom
            header={Common.HeaderOrderManager}
            body={orders && orders.length > 0 && orders}
          />
          <div className="flex justify-end">
            <Confirm
              nameShow="Share Order"
              header="Share Order"
              content="Share this order to shipper?"
              nameBtn="Share"
              nameBtnCancel="Cancel"
              handleSave={(value) => {
                setIsOpenConfirm(false);
                handleUpdateBatchMode();
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
