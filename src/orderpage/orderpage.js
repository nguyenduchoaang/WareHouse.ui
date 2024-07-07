import * as React from "react";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import ExcelTable from "./readexel";
import Common from "../based/Common";
import WareHouseServices from "../based/services/WareHouseServices";
import axios from "axios";
import { useLoading } from "../based/context/LoadingContext";
import Toastify from "../based/Toastify";
import CONSTANTS, { TOASTIFY } from "../based/Constants";
import { set } from "date-fns";
const Selection = (props) => {
  return (
    <Select onValueChange={(value) => props.onChanged(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Wave House" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Ho Chi Minh City</SelectLabel>
          {props &&
            props.listWareHouse &&
            props.listWareHouse.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default function OrderPage() {
  const { showLoading, hideLoading } = useLoading();
  const [toast, setToast] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  const [listWarehouse, setListWarehouse] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);
  const [dataExcel, setDataExcel] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    handleGetWareHouse(paging);
  }, []);

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast({ isOpen: false, type: "", message: "" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleFileUploadAPI = async () => {
    const formData = new FormData();
    formData.append("WarehouseId", selectedWarehouseId);
    formData.append("Orderfile", file);

    try {
      showLoading();
      const response = await axios.post(
        "https://localhost:7280/api/v1/orders/CreateOrder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("res", response);
      if (response.data === true) {
        setToast({
          isOpen: true,
          type: TOASTIFY.SUCCESS,
          message: "Create order successfully",
        });
        setDataExcel([]);
        setSelectedWarehouseId("");
        setFile(null);
      } else {
        setToast({
          isOpen: true,
          type: TOASTIFY.ERROR,
          message: "Create order failed",
        });
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      setToast({
        isOpen: true,
        type: TOASTIFY.ERROR,
        message: "Create order failed",
      });
      console.error("Error creating order:", error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      setDataExcel(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleGetWareHouse = async (paging) => {
    console.log(paging);
    const [err, data] = await WareHouseServices.GetWareHouses(paging);
    if (!err) {
      setPaging({
        ...paging,
        total: data.total,
        totalPage: data.totalPage,
      });
      const handleData = data.items.map((item) => {
        return {
          ...item,
          name: item.fullName,
        };
      });
      setListWarehouse(handleData);
    }
  };

  return (
    <div className="flex min-h-screen w-full ">
      <Toastify
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
      ></Toastify>
      <div className="flex flex-col w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                Admin
                <BreadcrumbLink asChild></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Create New Order</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Fill out the form to create a new order for a ware house.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="customer-name">Pick Ware House</Label>
                      <Selection
                        listWareHouse={listWarehouse}
                        onChanged={(value) => setSelectedWarehouseId(value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="file">Order File</Label>
                      <Input
                        type="file"
                        id="file"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                  <ExcelTable data={dataExcel}></ExcelTable>
                  <div className="flex justify-end"></div>
                </form>
                <Button onClick={handleFileUploadAPI}>Create Order</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
