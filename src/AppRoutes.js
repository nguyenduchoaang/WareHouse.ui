import LoginPage from "../src/loginpage/loginpage";
import NavBar from "./based/navbar";
import HomePage from "./homepage/homepage";
import RegisterComponent from "./loginpage/register";
import OrderPage from "./orderpage/orderpage";
import Analysis from "./analysis/analysis";
import OrderManager from "./manage/ordermanage";
import ShipManager from "./shipmanager/shipmanager";
import BatchManager from "./manage/batchmanage";

const AppRoutes = [
  {
    path: "/",
    element: HomePage,
  },
  {
    path: "/login",
    element: LoginPage,
    layout: "Empty",
  },
  {
    path: "/register",
    element: RegisterComponent,
  },
  {
    path: "/order",
    element: OrderPage,
  },
  {
    path: "/analysis",
    element: Analysis,
  },
  {
    path: "/order-manager/:id/:mode",
    element: OrderManager,
  },
  {
    path: "/ship",
    element: ShipManager,
  },
  {
    path: "/batch-manager",
    element: BatchManager,
  },
];

export default AppRoutes;
