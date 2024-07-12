import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useTable } from "react-table";
import TableCustom from "../based/table";
import Common from "../based/Common";
const ExcelTable = ({ data }) => {
  const columns = React.useMemo(
    () =>
      data[0]
        ? Object.keys(data[0]).map((key) => ({ Header: key, accessor: key }))
        : [],
    [data]
  );

  return (
    <TableCustom
      header={columns.map((item) => item.Header)}
      body={data.map((item) => Object.values(item))}
      isExcel={true}
    ></TableCustom>
  );
};

export default ExcelTable;
