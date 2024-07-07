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

export { BATCH_MODE, ROLE, STATUS };
export default CONSTANTS;
