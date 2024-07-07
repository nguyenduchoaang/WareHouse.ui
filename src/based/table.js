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

const TableCustom = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.body && props.body.slice(startIndex, endIndex);

  console.log("body", props.body);

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
        <TableBody>
          {currentItems &&
            currentItems.length > 0 &&
            currentItems.map((item, rowIndex) => (
              <TableRow key={rowIndex}>
                {item.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
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
