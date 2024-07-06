import BaseServices from "./BaseServices";

const key = "orders";

const OrderServices = {
  CreateOrder: async (model) => {
    return await BaseServices.Post(`/${key}/CreateOrders`, model);
  },
  GetOrders: async (paging) => {
    return await BaseServices.Get(`/${key}/GetOrders`, paging);
  },
};

export default OrderServices;
