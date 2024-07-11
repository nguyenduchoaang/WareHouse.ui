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

export function TableHeaderCustom(props) {
  return (
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
  );
}
