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
};

export default OrderServices;
