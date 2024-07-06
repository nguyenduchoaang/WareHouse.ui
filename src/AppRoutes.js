import LoginPage from "../src/loginpage/loginpage";
import NavBar from "./based/navbar";
import HomePage from "./homepage/homepage";
import RegisterComponent from "./loginpage/register";
import OrderPage from "./orderpage/orderpage";
import Analysis from "./analysis/analysis";
import OrderManager from "./manage/ordermanage";
import ShipManager from "./shipmanager/shipmanager";
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
    layout: "Empty",
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
    path: "/manage",
    element: OrderManager,
  },
  {
    path: "/ship",
    element: ShipManager,
  },
];

export default AppRoutes;
