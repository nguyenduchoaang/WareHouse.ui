import React, { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import PaginationBase from "../based/pagination";

const ShipTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = props.body && props.body.slice(startIndex, endIndex);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {props.header &&
            props.header.map((item, index) => (
              <TableHead key={index}>{item}</TableHead>
            ))}
          <TableHead>
            <span className="sr-only">Update</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentItems &&
          currentItems.length > 0 &&
          currentItems.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {item.map((cell, cellIndex) =>
                cellIndex !== 6 ? (
                  <TableCell key={cellIndex}>{cell}</TableCell>
                ) : null
              )}
              <TableCell className="text-red-500 font-medium">
                Delayed
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => props.onRowUpdate(item[6])}
                >
                  Update order
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ShipTable;
