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
  UpdateBatchModeById: async (model) => {
    return await BaseServices.Put(`/${key}/UpdateBatchModeByWarehouse/`, model);
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
  GetListBatchByWarehouse: async (model) => {
    return await BaseServices.Get(
      `/${key}/GetListBatchByWarehouse/${model.id}?batchmode=${model.batchmode}&page=${model.page}&size=${model.size}`
    );
  },
  GetListOrderDetailByBatch: async (model) => {
    return await BaseServices.Get(
      `/${key}/GetListOrdersByBatch/${model.id}?page=${model.page}&size=${model.size}`
    );
  },
};

export default OrderServices;
