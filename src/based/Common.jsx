import cookie from "react-cookies";
import Request from "./Request";
import { jwtDecode } from "jwt-decode";
var Common = {
  actionType: {
    Insert: 1,
    Update: 2,
    Delete: 3,
  },

  getStringWithoutExtension(stringUrl) {
    return stringUrl.replace(/\.[^/.]+$/, "");
  },

  convertStringToDate(dateString) {
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1;
    var year = parseInt(parts[2], 10);

    var date = new Date(year, month, day);

    // chuyen doi nam - thang - ngay
    var outputDateString =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);

    return outputDateString;
  },
};
export default Common;
