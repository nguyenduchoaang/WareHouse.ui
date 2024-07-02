import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { Main, CreateOrder, StatusOrder, ShareOrder, Home } from "./configsvg";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

const ConfigNavbar = [
  {
    id: 2,
    name: "Tạo đơn hàng",
    link: "/about",
    icon: <CreateOrder></CreateOrder>,
  },
  {
    id: 3,
    name: "Phân chia đơn hàng",
    link: "/services",
    icon: <ShareOrder></ShareOrder>,
  },
  {
    id: 4,
    name: "Tình trạng đơn hàng",
    link: "/services",
    icon: <StatusOrder></StatusOrder>,
  },
];

export default function NavBarLeft() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userName = sessionStorage.getItem("name");
    if (accessToken) {
      setIsLoggedIn(true);
      setName(userName);
    } else {
      setIsLoggedIn(false);
      setName("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    toast({
      title: "Thành công✅",
      description: "Bạn đã đăng xuất.",
    });
  };

  return (
    <nav className="fixed  w-1/5 h-screen  top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="   mx-auto pl-3 ">
        <Link to="/" className="flex items-center">
          <Main className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <div
          style={{ marginTop: "20%" }}
          className=" flex justify-between items-center"
        >
          <nav className="w-full flex flex-col hidden md:flex gap-4 ">
            {ConfigNavbar.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="font-medium flex items-center text-sm transition-colors hover:underline"
              >
                <p className="flex hover:bg-violet-600 w-full ease-in duration-150 ">
                  {item.icon}
                  <p className=" mb-3.5 ml-1.5 mr-3">{item.name}</p>
                </p>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
}
