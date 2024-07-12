import { useState, useMemo, useEffect } from "react";
import { Button } from "../components/ui/button";

import Common from "../based/Common";
import OrderServices from "../based/services/OrderServices";
import BatchOrder from "../assets/batch.png";
import { format } from "date-fns";
import Confirm from "../based/Confirm";
import { useLoading } from "../based/context/LoadingContext";
import { BATCH_MODE, TOASTIFY } from "../based/Constants";
import { useNavigate } from "react-router-dom";

export default function BatchManager() {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const [pagingBatch, setPagingBatch] = useState(Common.PagingModel);
  const [formGetBatch, setFormGetBatch] = useState({
    id: "",
    batchmode: BATCH_MODE.TRUCKIN,
    size: pagingBatch.size,
    page: pagingBatch.page,
  });
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

  const handleUpdateBatchMode = async () => {
    showLoading();
    const id = Common.GetInfo("id");
    console.log(id);
    const [err, data] = await OrderServices.UpdateBatchModeById(id);
    if (!err) {
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
      hideLoading();
      console.log(err);
    }
  };

  const handleViewOrder = (id) => {
    console.log(id);
    navigate(`/order-manager/${id}`);
  };

  return (
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
                Date Exported: {format(item.dateExported, "dd/MM/yyyy, hh:mm")}
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
              </p>
            </div>
          </div>
        ))}
    </section>
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
