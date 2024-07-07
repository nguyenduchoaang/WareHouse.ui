import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "../components/ui/use-toast";
import NavBar from "../based/navbar";
import AccountServices from "../based/services/AccountServices";
import cookies from "react-cookies";
import Common from "../based/Common";
import Banner from "../assets/banner.jpg";
import CONSTANTS, { ROLE } from "../based/Constants";
import { useLoading } from "../based/context/LoadingContext";

export default function LoginComponent() {
  const [infoLogin, setInfoLogin] = useState({
    email: "",
    password: "",
  });
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (Common.CheckToken()) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (model) => {
    showLoading();
    const [err, data] = await AccountServices.Login(model);
    if (!err) {
      cookies.save("token", data.accessToken);
      cookies.save("refreshToken", data.refreshToken);
      cookies.save("accountId", data.accountId);
      cookies.save("role", data.roleName);
      var role = data.roleName;
      switch (role) {
        case ROLE.ADMIN:
          cookies.save("id", data.adminResponse.id);
          break;
        case ROLE.WAREHOUSE:
          cookies.save("id", data.warehouseResponse.id);
          break;
        case ROLE.SHIPPER:
          cookies.save("id", data.shipperResponse.id);
          break;
        default:
          break;
      }
      hideLoading();
      navigate("/");
    } else {
      hideLoading();
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('${Banner}')`,
          zIndex: -1,
        }}
      />
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold 	 ">Chào mừng trở lại</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130", fontSize: "17px" }}
          >
            Vui lòng nhập tài khoản mật khẩu của bạn để đăng nhập.
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmitLogin}>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Tên đăng nhập</Label>
                <Input
                  type="email"
                  id="memberName"
                  value={infoLogin.email}
                  onChange={(e) =>
                    setInfoLogin({ ...infoLogin, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={infoLogin.password}
                  onChange={(e) =>
                    setInfoLogin({ ...infoLogin, password: e.target.value })
                  }
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleLogin(infoLogin)}
                type="submit"
                className="w-full"
              >
                Đăng nhập
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
