import * as React from "react";
import { useEffect, useState } from "react";
import OrderServices from "../based/services/OrderServices";
import TableCustom from "../based/table";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const [err, data] = await OrderServices.GetOrders();
      if (err) {
        console.log(err);
      } else {
        setOrders(data);
      }
    };
    fetchData();
  }, []);
  console.log(orders);
  return (
    <>
      <Card>
        <CardContent>
          <TableCustom data={orders} />
          <div className="flex justify-end">
            <Button type="submit">Share Order</Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
