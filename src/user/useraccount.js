import { React, useEffect, useState } from "react";
import Common from "../based/Common";
import {
  TableHeaderCustom,
  TableBodyCustom,
  TableCustom,
} from "../based/table/TableComponent";
import { Table } from "../components/ui/table";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";
import WareHouseServices from "../based/services/WareHouseServices";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const Selection = (props) => {
  return (
    <Select onValueChange={(value) => props.onChanged(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={props.placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
          {props &&
            props.data &&
            props.data.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default function UserAccount() {
  const [listDataUser, setListDataUser] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);
  const [typeSelected, setTypeSelected] = useState(1);
  const [listWareHouseSelect, setListWareHouseSelect] = useState([]);
  const [listTypeAccount, setListTypeAccount] = useState([
    {
      id: 1,
      name: "WareHouse",
    },
    {
      id: 2,
      name: "Shipper",
    },
  ]);

  useEffect(() => {
    handleGetWareHouse(paging);
  }, []);

  const handleGetWareHouse = async (model) => {
    const [err, data] = await WareHouseServices.GetWareHouses(model);
    if (!err) {
      const temp = [];
      const wareHouseSelect = [];
      data.items.forEach((item, index) => {
        const genderUser = item.gender === true ? "Male" : "Female";
        const dob = format(item.dateOfBirth, "dd/MM/yyyy");
        temp.push([
          index + 1,
          item.fullName,
          item.phone,
          item.location,
          genderUser,
          dob,
        ]);
        wareHouseSelect.push({
          id: item.id,
          name: item.fullName,
        });
      });
      setListDataUser(temp);
      setListWareHouseSelect(wareHouseSelect);
    } else {
      console.log(err);
    }
  };

  const handleGetListShipper = async (id) => {
    console.log("id", id);
    let model = {
      id: id,
      page: paging.page,
      size: paging.size,
    };
    const [err, data] = await WareHouseServices.GetListShipperByWareHouseId(
      model
    );
    if (!err) {
      const temp = [];
      data.items.forEach((item, index) => {
        const genderUser = item.gender === true ? "Male" : "Female";
        const dob = format(item.dateOfBirth, "dd/MM/yyyy");
        temp.push([
          index + 1,
          item.fullName,
          item.phone,
          item.location,
          genderUser,
          dob,
        ]);
      });
      setListDataUser(temp);
      console.log(data);
    } else {
      console.log(err);
    }
  };

  return (
    <div>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              Admin
              <BreadcrumbLink asChild></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>User Account</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex mt-5">
        <Selection
          data={listTypeAccount}
          label="Type Account"
          placeHolder="Select Type Account"
          onChanged={(value) => {
            setTypeSelected(value);
            handleGetWareHouse(paging);
          }}
        ></Selection>
        {typeSelected === 2 && (
          <div className="ml-5">
            <Selection
              data={listWareHouseSelect}
              label="Ware House"
              placeHolder="Select Ware house"
              onChanged={(value) => handleGetListShipper(value)}
            ></Selection>
          </div>
        )}
      </div>
      <TableCustom header={Common.HeaderAccount} body={listDataUser} />
    </div>
  );
}
