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
  const formData = {
    memberName,
    password,
    name,
    role,
    location,
    dob,
  };
  const [modelRegister, setModelRegister] = useState({
    email: "string",
    password: "string",
    confirmPassword: "string",
    roleName: "string",
    fullName: "string",
    dateOfBirth: "2024-07-12T17:57:46.349Z",
    gender: true,
    phone: "string",
    warehouseId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    location: "string",
  });

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register Account</h1>
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
                  <Label htmlFor="full-name">Role</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Gender</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Label className="flex items-center space-x-2">
                      <Input
                        style={{ width: "20px" }}
                        type="radio"
                        name="gender"
                        value="Nam"
                        className="form-radio"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>Man</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Input
                        style={{ width: "20px" }}
                        type="radio"
                        name="gender"
                        value="Nam"
                        className="form-radio"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <span>Women</span>
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Phone Number</Label>

                  <Input
                    type="number"
                    id="full-name"
                    placeholder="ex: 0123"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
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
