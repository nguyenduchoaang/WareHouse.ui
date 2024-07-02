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
    id: 1,
    name: "Trang chủ",
    link: "/",
    icon: <Home></Home>,
  },
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

export default function NavBar() {
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
    <nav className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl  mx-auto px-4 ">
        <div className="flex justify-between h-14 items-center">
          <Link to="/" className="flex items-center">
            <Main className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            {ConfigNavbar.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="font-medium flex items-center text-sm transition-colors hover:underline"
              >
                {item.icon}
                <p className="ml-1.5 mr-3">{item.name}</p>
              </Link>
            ))}
            {/* <Link
              to="/"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Trang chủ
            </Link>
            <Link
              to="/about"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Giới thiệu
            </Link>
            <Link
              to="/services"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Dịch vụ
            </Link>
            <Link
              to="/contact"
              className="font-medium flex items-center text-sm transition-colors hover:underline"
            >
              Liên hệ
            </Link> */}
          </nav>
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="outline" size="sm">
                  <Link to="/login">Đăng nhập</Link>
                </Button>
                <Button size="sm">
                  <Link to="/register">Đăng ký</Link>
                </Button>
              </>
            ) : (
              <>
                <span>Xin chào, {name}</span>
                <Button size="sm">
                  <Link to="/profile">Trang cá nhân</Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Đăng xuất</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có muốn đăng xuất?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Hủy</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Xác nhận
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function MountainIcon(props) {
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
      <circle cx="12" cy="12" r="7" />
      <polyline points="12 9 12 12 13.5 13.5" />
      <path d="M17.5 6.5a9 9 0 1 1-11 0" />
    </svg>
  );
}
