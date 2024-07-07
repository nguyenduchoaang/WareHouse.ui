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
    cookie.remove("accountId");
    cookie.remove("role");
    cookie.remove("id");
  },
  CheckRole: () => {
    var role = cookie.load("role");
    if (role !== null && role !== undefined) {
      return role;
    } else {
      return null;
    }
  },
  GetRefreshToken: () => {
    return cookie.load("refreshToken");
  },
  GetInfo: (key) => {
    switch (key) {
      case "accountId":
        return cookie.load("accountId");
      case "role":
        return cookie.load("role");
      case "id":
        return cookie.load("id");
      default:
        return "";
    }
  },
  PagingModel: {
    page: 1,
    size: 10,
  },
  HeaderOrderManager: [
    "ID",
    "Order Date",
    "Expected Date",
    "Price",
    "Delivery Date",
    "Batch Mode",
    "Shipper Id",
    "Image",
  ],
  HeaderShipManager: [
    "ID",
    "Order Date",
    "Expected Date",
    "Price",
    "Warehouse ID",
    "Image",
    "Status",
    "Action",
  ],
};

export default Common;
