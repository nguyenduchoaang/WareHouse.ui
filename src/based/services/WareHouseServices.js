import CONSTANTS from "../Constants";
import BaseServices from "./BaseServices";

const WareHouseServices = {
  GetWareHouses: async (model) => {
    return await BaseServices.Get(
      `/${CONSTANTS.WAREHOUSE}/GetWarehouses?page=${model.page}&size=${model.size}`
    );
  },
  GetListShipperByWareHouseId: async (model) => {
    return await BaseServices.Get(
      `/${CONSTANTS.WAREHOUSE}/GetShippersInWarehouseId/${model.id}?page=${model.page}&size=${model.size}`
    );
  },
};

export default WareHouseServices;
