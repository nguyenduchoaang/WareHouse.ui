import { useState, useMemo, useEffect } from "react";
import { Button } from "../components/ui/button";

import Common from "../based/Common";
import OrderServices from "../based/services/OrderServices";
import BatchOrder from "../assets/batch.png";
import { format, set } from "date-fns";
import Confirm from "../based/Confirm";
import { useLoading } from "../based/context/LoadingContext";
import { BATCH_MODE, TOASTIFY } from "../based/Constants";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Toastify from "../based/Toastify";
const Selection = (props) => {
  return (
    <Select onValueChange={(value) => props.onChanged(value)}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select Batch Mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>BATCH MODE</SelectLabel>
          {props &&
            props.statusBatch &&
            props.statusBatch.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default function BatchManager() {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const [pagingBatch, setPagingBatch] = useState(Common.PagingModel);
  const [formGetBatch, setFormGetBatch] = useState({
    id: Common.GetInfo("id"),
    batchmode: BATCH_MODE.TRUCKIN,
    size: pagingBatch.size,
    page: pagingBatch.page,
  });
  const [batchMode, setBatchMode] = useState([
    {
      id: 1,
      name: BATCH_MODE.TRUCKIN,
    },
    {
      id: 2,
      name: BATCH_MODE.IMPORTED,
    },
  ]);
  const [listBatch, setListBatch] = useState([]);
  useEffect(() => {
    let id = Common.GetInfo("id");
    let model = { ...formGetBatch, id: id };
    handleGetListBatchByWarehouse(model);
  }, []);
  const [toast, setToast] = useState({
    isOpen: false,
    type: TOASTIFY.SUCCESS,
    message: "",
  });

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {}, []);

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

  const handleGetListBatchByWarehouse = async (model) => {
    const [err, data] = await OrderServices.GetListBatchByWarehouse(model);
    if (!err) {
      console.log(data);
      setListBatch(data.items);
    } else {
      console.log(err);
    }
  };

  const handleUpdateBatchMode = async (id) => {
    showLoading();
    const wareHouseId = Common.GetInfo("id");
    const model = {
      warehouseId: wareHouseId,
      batchId: id,
    };
    const [err, data] = await OrderServices.UpdateBatchModeById(model);
    if (!err) {
      hideLoading();
      setToast({
        isOpen: true,
        type: TOASTIFY.SUCCESS,
        message: "Share order success",
      });
      const newBatch = listBatch.filter((item) => item.id !== id);
      setListBatch(newBatch);
    } else {
      setToast({
        isOpen: true,
        type: TOASTIFY.ERROR,
        message: "Share order fail",
      });
      hideLoading();
      console.log(err);
    }
  };

  const handleViewOrder = (id) => {
    navigate(`/order-manager/${id}/${formGetBatch.batchmode}`);
  };

  const handleChangeBatchMode = (value) => {
    let model = {
      ...formGetBatch,
      batchmode: value === 2 ? BATCH_MODE.IMPORTED : BATCH_MODE.TRUCKIN,
    };
    setFormGetBatch(model);
    handleGetListBatchByWarehouse(model);
  };

  return (
    <>
      <Selection
        statusBatch={batchMode}
        onChanged={(value) => handleChangeBatchMode(value)}
      ></Selection>
      <Toastify
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
      />
      <section
        className="
      grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  py-8"
      >
        {listBatch.length > 0 &&
          listBatch &&
          listBatch.map((item, index) => (
            <div
              className="
        border-solid border-2 border-gray-200 rounded-lg
  
            bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={BatchOrder}
                alt="Product Image"
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{item.batchMode}</h3>
                <p className="text-muted-foreground text-sm">
                  Date Exported:{" "}
                  {format(item.dateExported, "dd/MM/yyyy, hh:mm")}
                </p>
                <p className="text-muted-foreground text-sm">
                  Date Imported:{" "}
                  {item.dateInported !== null
                    ? format(item.dateInported, "dd/MM/yyyy, hh:mm")
                    : "Not yet"}
                </p>
                <p className="flex justify-between">
                  <Button
                    onClick={() => handleViewOrder(item.id)}
                    variant="outline"
                  >
                    View order
                  </Button>
                  {formGetBatch.batchmode === BATCH_MODE.TRUCKIN && (
                    <Confirm
                      nameShow="Share Order"
                      header="SHARE ORDER"
                      content="Are you sure you want to share the list of orders with the shipper?"
                      nameBtn="Share"
                      nameBtnCancel="Cancel"
                      handleSave={(value) => {
                        setIsOpenConfirm(false);
                        handleUpdateBatchMode(item.id);
                      }}
                    />
                  )}
                </p>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
