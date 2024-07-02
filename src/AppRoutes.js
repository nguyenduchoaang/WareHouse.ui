import LoginPage from "../src/loginpage/loginpage";
import NavBar from "./based/navbar";
import HomePage from "./homepage/homepage";
import RegisterComponent from "./loginpage/register";
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
];

export default AppRoutes;
