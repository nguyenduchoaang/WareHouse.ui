import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useEffect } from "react";
import { Selection } from "../orderpage/orderpage";
import Common from "../based/Common";
import WareHouseServices from "../based/services/WareHouseServices";
import AccountServices from "../based/services/AccountServices";
import Toastify from "../based/Toastify";
export default function RegisterComponent() {
  const [paging, setPaging] = useState(Common.PagingModel);
  const [modelRegister, setModelRegister] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    roleName: "",
    fullName: "",
    dateOfBirth: "2024-07-12T17:57:46.349Z",
    gender: true,
    phone: "",
    warehouseId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    location: "",
  });
  const [listWarehouse, setListWarehouse] = useState([]);
  const [toast, setToast] = useState({
    isOpen: false,
    type: "",
    message: "",
  });
  useEffect(() => {
    handleGetWareHouse(paging);
  }, []);

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast({ isOpen: false, type: "", message: "" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleGetWareHouse = async (paging) => {
    console.log(paging);
    const [err, data] = await WareHouseServices.GetWareHouses(paging);
    if (!err) {
      setPaging({
        ...paging,
        total: data.total,
        totalPage: data.totalPage,
      });
      const handleData = data.items.map((item) => {
        return {
          ...item,
          name: item.location,
        };
      });
      setListWarehouse(handleData);
    }
  };

  const handleRegister = async () => {
    const [err, data] = await AccountServices.RegisterAccount(modelRegister);
    if (!err) {
      setToast({
        isOpen: true,
        type: "success",
        message: "Register success",
      });
      setModelRegister({
        email: "",
        password: "",
        confirmPassword: "",
        roleName: "",
        fullName: "",
        dateOfBirth: "2024-07-12T17:57:46.349Z",
      });
    } else {
      setToast({
        isOpen: true,
        type: "error",
        message: "Register failed",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Toastify
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
      ></Toastify>
      <div className="flex justify-center min-h-screen bg-gradient-to-br">
        <div className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Register Account</h1>
          </div>
          <Card>
            <CardContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="ex: abc@gmail.com"
                  value={modelRegister.email}
                  required
                  onChange={(e) =>
                    setModelRegister({
                      ...modelRegister,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={modelRegister.password}
                  required
                  onChange={(e) =>
                    setModelRegister({
                      ...modelRegister,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={modelRegister.confirmPassword}
                  required
                  onChange={(e) =>
                    setModelRegister({
                      ...modelRegister,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">User name</Label>
                  <Input
                    id="full-name"
                    placeholder="ex: abc"
                    value={modelRegister.fullName}
                    required
                    onChange={(e) =>
                      setModelRegister({
                        ...modelRegister,
                        fullName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    onValueChange={(value) => {
                      if (value === "Warehouse") {
                        setModelRegister({
                          ...modelRegister,
                          roleName: value,
                        });
                      } else {
                        setModelRegister({
                          ...modelRegister,
                          roleName: value,
                        });
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="Warehouse">Warehouse</SelectItem>
                        <SelectItem value="Shipper">Shipper</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Label className="flex items-center space-x-2">
                      <Input
                        style={{ width: "20px" }}
                        type="radio"
                        name="gender"
                        value="Male"
                        className="form-radio"
                        onChange={(e) =>
                          setModelRegister({
                            ...modelRegister,
                            gender: true,
                          })
                        }
                      />
                      <span>Male</span>
                    </Label>
                    <Label className="flex items-center space-x-2">
                      <Input
                        style={{ width: "20px" }}
                        type="radio"
                        name="gender"
                        value="Female"
                        className="form-radio"
                        onChange={(e) =>
                          setModelRegister({
                            ...modelRegister,
                            gender: false,
                          })
                        }
                      />
                      <span>Female</span>
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Phone Number</Label>

                  <Input
                    type="number"
                    id="full-name"
                    placeholder="ex: 0123"
                    value={modelRegister.phone}
                    required
                    onChange={(e) =>
                      setModelRegister({
                        ...modelRegister,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              {/* <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={modelRegister.confirmPassword}
                    required
                    onChange={(e) =>
                      setModelRegister({
                        ...modelRegister,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div> */}

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Location"
                  value={modelRegister.location}
                  required
                  onChange={(e) =>
                    setModelRegister({
                      ...modelRegister,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={modelRegister.dateOfBirth}
                  required
                  onChange={(e) =>
                    setModelRegister({
                      ...modelRegister,
                      dateOfBirth: e.target.value,
                    })
                  }
                />
              </div>
              {modelRegister.roleName === "Shipper" && (
                <div className="space-y-2">
                  <Label htmlFor="warehouseId">Select Ware House</Label>
                  <Selection
                    listWareHouse={listWarehouse}
                    onChanged={(value) =>
                      setModelRegister({
                        ...modelRegister,
                        warehouseId: value,
                      })
                    }
                  ></Selection>
                </div>
              )}
              <div className="flex gap-4">
                {/* <Link
                    to="/"
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Quay lại
                  </Link> */}
                <Button onClick={handleRegister} className="flex-1">
                  Đăng ký
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
