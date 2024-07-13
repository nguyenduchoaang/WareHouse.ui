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

export default function UserAccount() {
  const [listWareHouse, setListWareHouse] = useState([]);
  const [paging, setPaging] = useState(Common.PagingModel);

  useEffect(() => {
    handleGetWareHouse(paging);
  }, []);

  const handleGetWareHouse = async (model) => {
    const [err, data] = await WareHouseServices.GetWareHouses(model);
    if (!err) {
      console.log(data);
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
      setListWareHouse(temp);
    } else {
      console.log(err);
    }
  };

  console.log(listWareHouse);

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

      <TableCustom header={Common.HeaderAccount} body={listWareHouse} />
    </div>
  );
}
