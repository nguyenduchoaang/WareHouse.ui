import BaseServices from "./BaseServices";
import CONSTANTS from "../Constants";
const key = CONSTANTS.AUTHENTICATIONS;

const AccountServices = {
  Login: async (model) => {
    return await BaseServices.Post(`/${key}/Login`, model);
  },
  Logout: async (model) => {
    return await BaseServices.Delete(`/${key}/LogOut`, model);
  },
  RegisterAccount: async (model) => {
    return await BaseServices.Post(`/${key}/RegisterAccount`, model);
  },
};

export default AccountServices;
