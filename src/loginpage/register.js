import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { useState } from "react";
import { toast } from "../components/ui/use-toast";

export default function RegisterComponent() {
  const [memberName, setMemberName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("shipper");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password!== confirmPassword) {
  //     toast({
  //       variant: "destructive",
  //       title: "Mật khẩu không khớp",
  //     });
  //     return;
  //   }
  //   try {
  //     const response = await CreateMember(memberName, password, name, yob, role, location, dob);
  //     if (response.status === 200) {
  //       toast({
  //         title: "Đăng ký thành công vui lòng đăng nhập",
  //       });
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     if (error.response.status === 500) {
  //       toast({
  //         variant: "destructive",
  //         title: "Tài khoản này đã được đăng ký",
  //       });
  //     } else
  //       toast({
  //         variant: "destructive",
  //         title: "Thất bại",
  //         description: error.response.data,
  //       });
  //   }
  // };
  const formData = {
    memberName,
    password,
    name,
    role,
    location,
    dob,
  };

  console.log(formData);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register Account</h1>
          <p
            className="text-muted-foreground font-semibold"
            style={{ color: "#1A2130" }}
          >
            Fill info of user account to register
          </p>
        </div>
        <Card>
          <form>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  id="username"
                  placeholder="ex: abc@gmail.com"
                  value={memberName}
                  required
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">User name</Label>
                  <Input
                    id="full-name"
                    placeholder="ex: abc"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Vai trò</Label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    className="w-[180px]"
                  >
                    <option value="warehouse">Ware House</option>
                    <option value="shipper">Shipper</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Location"
                  value={location}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  required
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Quay lại
                </Link>
                <Button type="submit" className="flex-1">
                  Đăng ký
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}
