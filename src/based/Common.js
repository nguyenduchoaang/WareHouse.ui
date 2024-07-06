import cookie from "react-cookies";

var Common = {
  RemoveToken: () => {
    cookie.remove("token");
    sessionStorage.removeItem("tfuToken");
  },
};

export default Common;
