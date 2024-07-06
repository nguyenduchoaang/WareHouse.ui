import CONSTANTS from "../Constants";
import BaseServices from "./BaseServices";

const WareHouseServices = {
  GetWareHouses: async () => {
    return await BaseServices.Get(`/${CONSTANTS.WAREHOUSE}/GetWareHouses`);
  },
};

export default WareHouseServices;
