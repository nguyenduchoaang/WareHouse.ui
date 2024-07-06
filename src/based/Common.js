import { Check } from "lucide-react";
import cookie from "react-cookies";

var Common = {
  CheckToken: () => {
    var token = cookie.load("token");
    if (token) {
      return true;
    }
    return false;
  },
  RemoveToken: () => {
    cookie.remove("token");
    cookie.remove("refreshToken");
  },
  GetRefreshToken: () => {
    return cookie.load("refreshToken");
  },
};

export default Common;
