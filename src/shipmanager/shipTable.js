import { Button } from "../components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";

const ShipTable = ({ onRowUpdate }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Expected Date of Delivery</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Warehouse ID</TableHead>
          <TableHead>Delivery Date</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Imported Date</TableHead>
          <TableHead>Exported Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Update</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1004</TableCell>
          <TableCell>2023-10-04</TableCell>
          <TableCell>2023-10-08</TableCell>
          <TableCell>$850.00</TableCell>
          <TableCell>WH126</TableCell>
          <TableCell>2023-10-09</TableCell>
          <TableCell>101 Pine St, City, Country</TableCell>
          <TableCell>2023-10-05</TableCell>
          <TableCell>2023-10-10</TableCell>
          <TableCell className="text-red-500 font-medium">Delayed</TableCell>
          <TableCell>
            <Button
              size="sm"
              className="w-full"
              onClick={() => onRowUpdate({ id: 1004 })}
            >
              Update order
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ShipTable;
