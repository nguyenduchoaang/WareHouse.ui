import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import ShipTable from "./shipTable";
import UpdateDialog from "./updateDialog";

const ShipManager = () => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleUpdateOrder = (id) => {
    setSelectedRow(id);
    setIsUpdateDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full max-w-9xl">
        <CardHeader>
          <CardTitle>Shipper Tracking</CardTitle>
          <CardDescription>
            Track shipments with the following details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShipTable onRowUpdate={handleUpdateOrder} />
        </CardContent>
      </Card>
      <UpdateDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => {
          setIsUpdateDialogOpen(false);
          setSelectedRow(null);
        }}
        onSubmit={(value) => {
          console.log(value);
          setIsUpdateDialogOpen(false);
          setSelectedRow(null);
        }}
      />
    </>
  );
};

export default ShipManager;
