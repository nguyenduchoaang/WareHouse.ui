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
export default function LoginComponent() {
  const [infoLogin, setInfoLogin] = useState({
    email: "",
    password: "",
  });
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
    const [err, data] = await AccountServices.Login(model);
    if (!err) {
      cookies.save("token", data.accessToken);
      cookies.save("refreshToken", data.refreshToken);
      navigate("/");
    } else {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/modern-empty-room_23-2150528603.jpg?w=1380&t=st=1720209150~exp=1720209750~hmac=d0f7ba450c3b3272383e75e97bddb9b7afd97a285911012cf2bd77ee84cd128c')`,
          zIndex: -1,
        }}
      />
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Chào mừng trở lại</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130" }}
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
              <button
                onClick={() => handleLogin(infoLogin)}
                type="submit"
                className="w-full"
              >
                Đăng nhập
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
