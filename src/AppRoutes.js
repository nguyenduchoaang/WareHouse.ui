import LoginPage from "../src/loginpage/loginpage";
import NavBar from "./based/navbar";
import HomePage from "./homepage/homepage";
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
];

export default AppRoutes;
