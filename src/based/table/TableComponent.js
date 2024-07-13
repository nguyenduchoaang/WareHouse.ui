import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
import PaginationBase from "../pagination";
export function TableHeaderCustom(props) {
  return (
    <TableHeader
      className="bg-gray-50"
      style={{ borderBottom: "1px solid #e2e8f0" }}
    >
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
  );
}

export function TableBodyCustom(props) {
  return (
    <>
      <TableBody>
        {props.body &&
          props.body.length > 0 &&
          props.body.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {item.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </>
  );
}

export function TableCustom(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.body && props.body.slice(startIndex, endIndex);

  return (
    <>
      <Table
        className="min-w-full divide-y divide-gray-200 shadow-sm border-b border-gray-200 sm:rounded-lg overflow-hidden mt-4    "
        style={{ borderCollapse: "collapse" }}
      >
        <TableHeaderCustom header={props.header} />
        {props.body.length > 0 && <TableBodyCustom body={currentItems} />}
      </Table>
      <PaginationBase
        totalPages={Math.ceil(props.body && props.body.length / itemsPerPage)}
        currentPage={currentPage}
        onChangePage={handlePageChange}
      />
    </>
  );
}
