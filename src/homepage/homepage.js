import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";

import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import NavigationBase from "../based/pagination";
import LoadingW from "../based/LoadingW";
const OrderHeader = [
  {
    id: 1,
    name: "Total Orders",
    icon: <PackageIcon />,
    value: "1,234",
  },
  {
    id: 2,
    name: "Pending Shipments",
    icon: <TruckIcon />,
    value: "87",
  },
  {
    id: 3,
    name: "Completed Shipments",
    icon: <CircleCheckIcon />,
    value: "1,102",
  },
  {
    id: 4,
    name: "Integrations",
    icon: <LinkIcon />,
    value: "5",
  },
];
const ConfigTableHeader = {
  1: "Order Id",
  2: "Img",
  3: "Order Date",
  4: "Expected",
  5: "Address",
  6: "Warehouse",
  7: "Shipper",
  8: "Status",
  9: "Price",
};
const DataTable = [
  {
    id: 1,
    img: "https://source.unsplash.com/random/100x100",
    orderDate: "June 12, 2023",
    expected: "June 15, 2023",
    address: "1234 Main St, Los Angeles, CA 90001",
    wareHouse: "Warehouse 1",
    shipper: "UPS",
    status: "In Transit",
    price: "$249.99",
  },
];

export const _renderHeader = () => {
  return (
    <section>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {OrderHeader.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>{item.name}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

const _renderRecentOrders = (props) => {
  return (
    <>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Orders</h2>
          <Button size="sm" variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Order
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipping</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ORD-123</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  <TruckIcon className="w-4 h-4 mr-2" />
                  Ship
                </Button>
              </TableCell>
              <TableCell>$249.99</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <MoveHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Warehouse
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Shipper
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FilePenIcon className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD-456</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  <TruckIcon className="w-4 h-4 mr-2" />
                  Ship
                </Button>
              </TableCell>
              <TableCell>$189.99</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <MoveHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Warehouse
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Shipper
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FilePenIcon className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD-789</TableCell>
              <TableCell>Michael Johnson</TableCell>
              <TableCell>
                <Badge variant="secondary">Pending</Badge>
              </TableCell>
              <TableCell>
                <Button size="sm" variant="outline">
                  <TruckIcon className="w-4 h-4 mr-2" />
                  Ship
                </Button>
              </TableCell>
              <TableCell>$299.99</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline">
                      <MoveHorizontalIcon className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Warehouse
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ShareIcon className="w-4 h-4 mr-2" />
                      Share with Shipper
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FilePenIcon className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <TrashIcon className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <NavigationBase />
      </section>
    </>
  );
};
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid gap-8 p-4 md:p-6">
        {_renderHeader()}
        {_renderRecentOrders()}
      </main>
    </div>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function LinkIcon(props) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
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

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ShareIcon(props) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
