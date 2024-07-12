import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/ui/table";
// import PaginationBase from "./pagination";

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

export function TableBodyCustom(props) {
  return (
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
  );
}
