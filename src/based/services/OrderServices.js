import BaseServices from "./BaseServices";
import CONSTANTS from "../Constants";
const key = CONSTANTS.ORDER;

const OrderServices = {
  CreateOrder: async (model) => {
    return await BaseServices.Post(`/${key}/CreateOrders`, model);
  },
  GetOrders: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrders`, paging);
  },
  GetOrdersByBatchMode: async (model) => {
    return await BaseServices.Get(
      `/${key}/GetOrderOfWarehouseByBatchMode/${model.id}?BatchMode=${model.BatchMode}&page=${model.page}&size=${model.size}`
    );
  },
  UpdateBatchModeById: async (id) => {
    return await BaseServices.Put(`/${key}/UpdateBatchModeByWarehouse/${id}`);
  },
  GetOrderImported: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrderImported`, paging);
  },
  GetOrderTruckOut: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrderTruckOut`, paging);
  },
  GetOrderFail: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrderFail`, paging);
  },
  GetOrderSuccess: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrderSuccess`, paging);
  },
};

export default OrderServices;
