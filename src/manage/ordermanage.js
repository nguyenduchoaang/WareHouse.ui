import * as React from "react";
import { useEffect, useState } from "react";
import OrderServices from "../based/services/OrderServices";
import TableCustom from "../based/table";
import { Card, CardContent } from "../components/ui/card";
import { BATCH_MODE } from "../based/Constants";
import Common from "../based/Common";
import { format, set } from "date-fns";
import Confirm from "../based/Confirm";
import { useLoading } from "../based/context/LoadingContext";
import { TOASTIFY } from "../based/Constants";
import Toastify from "../based/Toastify";
import { useParams } from "react-router-dom";
export default function OrderManager() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    type: TOASTIFY.SUCCESS,
    message: "",
  });
  const [formGetOrder, setFormGetOrder] = useState({
    id: "",
    BatchMode: BATCH_MODE.TRUNKIN,
    size: paging.size,
    page: paging.page,
  });

  const [modelGetOrder, setModelGetOrder] = useState({
    id: id,
    size: paging.size,
    page: paging.page,
  });
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // handleGetOrderByBatchMode();
    handleGetListOrderByBatch(id);
  }, [id]);

  useEffect(() => {
    if (toast.isOpen) {
      setTimeout(() => {
        setToast({
          isOpen: false,
          type: "",
          message: "",
        });
      }, 500);
    }
  }, [toast]);

  // const handleGetOrderByBatchMode = async () => {
  //   showLoading();
  //   const id = Common.GetInfo("id");
  //   const formAPI = { ...formGetOrder, id: id };
  //   const [err, data] = await OrderServices.GetOrdersByBatchMode(formAPI);
  //   if (!err) {
  //     const temp = [];
  //     data.items.map((item) => {
  //       temp.push([
  //         item.id,
  //         format(new Date(item.orderDate), "dd/MM/yyyy hh:mm"),
  //         format(new Date(item.expectedDateOfDelivery), "dd/MM/yyyy"),
  //         item.price,
  //         format(new Date(item.deliveryDate), "dd/MM/yyyy hh:mm"),
  //         item.batchMode,
  //         item.batchId,
  //         item.img,
  //       ]);
  //     });
  //     setOrders(temp);
  //     hideLoading();
  //   } else {
  //     hideLoading();
  //     console.log(err);
  //   }
  // };

  const handleGetListOrderByBatch = async (id) => {
    showLoading();
    const model = { ...modelGetOrder, id: id };
    const [err, data] = await OrderServices.GetListOrderDetailByBatch(model);
    if (!err) {
      console.log("data", data);
      const temp = [];
      data.items.map((item, index) => {
        const deliveryDateFormatted =
          item.deliveryDate !== "0001-01-01T00:00:00"
            ? format(new Date(item.deliveryDate), "dd/MM/yyyy hh:mm")
            : "Chưa giao";
        temp.push([
          index + 1,
          format(new Date(item.orderDate), "dd/MM/yyyy hh:mm"),
          format(new Date(item.expectedDateOfDelivery), "dd/MM/yyyy"),
          item.price,
          deliveryDateFormatted,
          item.address,
          item.cusName,
          item.batchId,
          item.img,
        ]);
      });
      setOrders(temp);
      hideLoading();
    } else {
      hideLoading();

      console.log(err);
    }
  };

  const handleUpdateBatchMode = async () => {
    showLoading();
    const wareHouseId = Common.GetInfo("id");
    let model = {
      wareHouseId: wareHouseId,
      batchId: id,
    };
    const [err, data] = await OrderServices.UpdateBatchModeById(model);
    if (!err) {
      setOrders([]);
      hideLoading();
      setToast({
        isOpen: true,
        type: TOASTIFY.SUCCESS,
        message: "Share order success",
      });
    } else {
      setToast({
        isOpen: true,
        type: TOASTIFY.ERROR,
        message: "Share order fail",
      });
      console.log(data);
      hideLoading();
      console.log(err);
    }
  };

  return (
    <>
      <Toastify
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
      />
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
