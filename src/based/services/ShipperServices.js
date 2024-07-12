import BaseServices from "./BaseServices";
import CONSTANTS from "../Constants";
const key = CONSTANTS.SHIPPER;

const ShipperServices = {
  GetOrderOfShipperByBatchMode: async (model) => {
    return await BaseServices.Get(
      `/${key}/GetOrderOfShipperByBatchMode/${model.id}?batchmode=${model.BatchMode}&page=${model.page}&size=${model.size}`
    );
  },
  GetShippers: async (model) => {
    return await BaseServices.Get(
      `/${key}/GetShippers/${model.warehouseId}?page=${model.page}&size=${model.size}`
    );
  },
};

export default ShipperServices;
