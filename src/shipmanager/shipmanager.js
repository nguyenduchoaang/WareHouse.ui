import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ShipTable from "./shipTable";
import UpdateDialog from "./updateDialog";
import ShipperServices from "../based/services/ShipperServices";
import CONSTANTS, { BATCH_MODE, TOASTIFY } from "../based/Constants";
import Common from "../based/Common";
import TableCustom from "../based/table";
import { format } from "date-fns";
import axios from "axios";
import { useLoading } from "../based/context/LoadingContext";
import Toastify from "../based/Toastify";
const ShipManager = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [toast, setToast] = useState({
    isOpen: false,
    type: CONSTANTS.SUCCESS,
    message: "",
  });
  const [paging, setPaging] = useState(Common.PagingModel);
  const [orders, setOrders] = useState([]);
  const [formUpdate, setFormUpdate] = useState({
    image: null,
    status: "",
    batchOrderId: "",
  });
  const [formGetOrder, setFormGetOrder] = useState({
    id: "",
    BatchMode: BATCH_MODE.IMPORTED,
    size: paging.size,
    page: paging.page,
  });
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    handleGetOrderByBatchMode();
  }, []);

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

  const handleGetOrderByBatchMode = async () => {
    const id = Common.GetInfo("id");
    const formAPI = { ...formGetOrder, id: id };
    const [err, data] = await ShipperServices.GetOrderOfShipperByBatchMode(
      formAPI
    );
    if (!err) {
      const temp = [];
      data.items.map((item) => {
        temp.push([
          item.id,
          format(new Date(item.orderDate), "dd/MM/yyyy hh:mm"),
          format(new Date(item.expectedDateOfDelivery), "dd/MM/yyyy"),
          item.price,
          item.img,
          item.batchId,
        ]);
      });
      setOrders(temp);
    } else {
      console.log(err);
    }
  };

  const handleUpdateOrder = async (formData) => {
    showLoading();
    try {
      const response = await axios.post(
        "https://localhost:7280/api/v1/orders/UpdateBatchModebyShipper",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      hideLoading();
      if (response.data === true) {
        console.log("Update success");
        setToast({
          isOpen: true,
          type: TOASTIFY.SUCCESS,
          message: "Update success",
        });
        setOrders([]);
        handleGetOrderByBatchMode();
      } else {
        setToast({
          isOpen: true,
          type: TOASTIFY.ERROR,
          message: "Update failed",
        });
      }
    } catch (error) {
      hideLoading();
      setToast({
        isOpen: true,
        type: TOASTIFY.ERROR,
        message: "Update failed",
      });
    }
  };

  return (
    <>
      <Toastify
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
      />
      <Card className="w-full max-w-9xl">
        <CardHeader>
          <CardTitle>Shipper Tracking</CardTitle>
          <CardDescription>
            Track shipments with the following details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShipTable
            header={Common.HeaderShipManager}
            body={orders && orders.length > 0 && orders}
            onRowUpdate={(id) => {
              console.log(id);
              setFormUpdate({ ...formUpdate, batchOrderId: id });
              setIsUpdateDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>
      <UpdateDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          setFormUpdate({
            file: null,
            status: "",
            batchOrderId: "",
          });
        }}
        onChanged={(value) => console.log(value)}
        onSubmit={(value) => {
          console.log(value);
          const formUpdateAPI = formUpdate;
          formUpdateAPI.image = value.image;
          formUpdateAPI.status = value.status;
          setIsUpdateDialogOpen(false);
          console.log("form", formUpdateAPI);
          handleUpdateOrder(formUpdateAPI);
        }}
      />
    </>
  );
};

export default ShipManager;
