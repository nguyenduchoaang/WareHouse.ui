import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "../components/ui/use-toast";
import NavBar from "../based/navbar";

export default function LoginComponent() {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [memberError, setMemberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmitLogin = async (e) => {
    // e.preventDefault();
    // let hasError = false;
    // if (!memberName) {
    //   setMemberError("Email is required");
    //   hasError = true;
    // } else if (memberName.length < 5) {
    //   setMemberError("Member name must be at least 5 characters long");
    //   hasError = true;
    // } else {
    //   setMemberError("");
    // }
    // if (!password) {
    //   setPasswordError("Password is required");
    //   hasError = true;
    // } else if (password.length < 6) {
    //   setPasswordError("Password must be at least 6 characters long");
    //   hasError = true;
    // } else {
    //   setPasswordError("");
    // }
    // if (!hasError) {
    //   try {
    //     const response = await SignInAccount(memberName, password);
    //     if (response.status === 200) {
    //       toast({
    //         title: "Thành công, bạn đã đăng nhập!✅",
    //       });
    //       sessionStorage.setItem("accessToken", response.data.accessToken);
    //       sessionStorage.setItem("id", response.data.id);
    //       sessionStorage.setItem("memberName", response.data.memberName);
    //       sessionStorage.setItem("name", response.data.name);
    //       sessionStorage.setItem("admin", response.data.admin);
    //       navigate("/");
    //     }
    //   } catch (err) {
    //     if (err.response.status === 404) {
    //       toast({
    //         title: "Thất bại❌",
    //         description: "Sai tài khoản hoặc mật khẩu.",
    //       });
    //     }
    //   }
    // }
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
                  id="memberName"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                />
                {memberError && (
                  <div className="text-red-500 text-sm">{memberError}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <div className="text-red-500 text-sm">{passwordError}</div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </CardFooter>
          </form>
        </Card>
    
      </div>
    </div>
  );
}
