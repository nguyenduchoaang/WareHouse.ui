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
import { BATCH_MODE } from "../based/Constants";
import Common from "../based/Common";
import TableCustom from "../based/table";
import { format } from "date-fns";
import axios from "axios";
const ShipManager = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
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

  useEffect(() => {
    handleGetOrderByBatchMode();
  }, []);

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
          item.warehouseId,
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
      console.log("File", response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <>
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
