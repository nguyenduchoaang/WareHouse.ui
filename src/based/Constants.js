var CONSTANTS = {
  ORDER: "orders",
  WAREHOUSE: "warehouses",
  AUTHENTICATIONS: "authentications",
  SHIPPER: "shippers",
};
var BATCH_MODE = {
  SUCCESS: "SUCCESS",
  IMPORTED: "IMPORTED",
  TRUNKIN: "TRUCKIN",
};
var ROLE = {
  ADMIN: "Admin",
  WAREHOUSE: "Warehouse",
  SHIPPER: "Shipper",
};
var STATUS = [
  {
    value: "SUCCESS",
    label: "SUCCESS",
  },
  {
    value: "FAILED",
    label: "FAILED",
  },
];

var TOASTIFY = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export { BATCH_MODE, ROLE, STATUS, TOASTIFY };
export default CONSTANTS;
