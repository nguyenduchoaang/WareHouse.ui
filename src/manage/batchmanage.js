/**
 * v0 by Vercel.
 * @see https://v0.dev/t/5pLzK1oB7sY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useState, useMemo } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";

export default function BatchManager() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("orderNumber");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filters, setFilters] = useState({
    status: [],
    date: {
      start: null,
      end: null,
    },
    amount: {
      min: null,
      max: null,
    },
  });
  const orders = [
    {
      orderNumber: "ORD001",
      customerName: "John Doe",
      orderDate: "2023-06-01",
      totalAmount: 250.99,
      status: "Pending",
    },
    {
      orderNumber: "ORD002",
      customerName: "Jane Smith",
      orderDate: "2023-06-02",
      totalAmount: 150.75,
      status: "Fulfilled",
    },
    {
      orderNumber: "ORD003",
      customerName: "Bob Johnson",
      orderDate: "2023-06-03",
      totalAmount: 350.25,
      status: "Cancelled",
    },
    {
      orderNumber: "ORD004",
      customerName: "Sarah Lee",
      orderDate: "2023-06-04",
      totalAmount: 450.5,
      status: "Fulfilled",
    },
    {
      orderNumber: "ORD005",
      customerName: "Tom Wilson",
      orderDate: "2023-06-05",
      totalAmount: 550.0,
      status: "Pending",
    },
  ];
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const { status, date, amount } = filters;
        const { start, end } = date;
        const { min, max } = amount;
        return (
          (status.length === 0 || status.includes(order.status)) &&
          (start === null || new Date(order.orderDate) >= new Date(start)) &&
          (end === null || new Date(order.orderDate) <= new Date(end)) &&
          (min === null || order.totalAmount >= min) &&
          (max === null || order.totalAmount <= max) &&
          (order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
            order.customerName.toLowerCase().includes(search.toLowerCase()))
        );
      })
      .sort((a, b) => {
        const sortValue = (a, b) => {
          if (a[sortColumn] < b[sortColumn]) return -1;
          if (a[sortColumn] > b[sortColumn]) return 1;
          return 0;
        };
        return sortDirection === "asc" ? sortValue(a, b) : sortValue(b, a);
      });
  }, [search, sortColumn, sortDirection, filters]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };
  return (
    <div className="flex flex-col h-full">
      <header className="bg-background p-4 md:p-6 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={handleSearch}
                className="pl-10 w-full"
              />
            </div>
            <Button variant="outline" size="sm">
              <FilterIcon className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("orderNumber")}
              >
                Order #
                {sortColumn === "orderNumber" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("customerName")}
              >
                Customer
                {sortColumn === "customerName" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("orderDate")}
              >
                Order Date
                {sortColumn === "orderDate" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("totalAmount")}
              >
                Total
                {sortColumn === "totalAmount" && (
                  <span className="ml-2">
                    {sortDirection === "asc" ? "\u25B2" : "\u25BC"}
                  </span>
                )}
              </TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.orderNumber}>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell className="text-right">
                  ${order.totalAmount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      order.status === "Pending"
                        ? "warning"
                        : order.status === "Fulfilled"
                        ? "success"
                        : "danger"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500">
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
