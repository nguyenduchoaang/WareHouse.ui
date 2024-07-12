import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import PaginationBase from "./pagination";
import Common from "./Common";

const TableCustom = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.body && props.body.slice(startIndex, endIndex);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {props.header && props.header.length > 0 ? (
              props.header.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))
            ) : (
              <TableHead>Không có dữ liệu</TableHead>
            )}
          </TableRow>
        </TableHeader>
        {props.isExcel ? (
          <TableBody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {item.map((cell, cellIndex) => (
                    <>
                      {cellIndex === 0 || cellIndex === 1 || cellIndex === 3 ? (
                        <TableCell key={cellIndex}>
                          {cellIndex === 0 || cellIndex === 1 || cellIndex === 3
                            ? Common.excelSerialDateToJSDate(
                                cell
                              ).toLocaleDateString()
                            : cell}
                        </TableCell>
                      ) : (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      )}
                    </>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <TableBody>
            {currentItems &&
              currentItems.length > 0 &&
              currentItems.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {item.map((cell, cellIndex) => (
                    <>
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
      <PaginationBase
        totalPages={Math.ceil(props.body && props.body.length / itemsPerPage)}
        currentPage={currentPage}
        onChangePage={handlePageChange}
      />
    </>
  );
};

export default TableCustom;
