"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"; // Import Link for navigation
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateForm = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    if (!user.username) {
      newErrors.username = "Username không được để trống";
      isValid = false;
    }

    if (!user.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onLogin = () => {
    const hardcodedUser = { username: "admin", password: "admin" };

    if (validateForm()) {
      if (
        user.username === hardcodedUser.username &&
        user.password === hardcodedUser.password
      ) {
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("password", user.password);
        toast.success("Đăng nhập thành công");
      } else {
        toast.error("Username hoặc mật khẩu không đúng");
      }
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen flex flex-wrap flex-col items-center justify-center">
      <Card className="w-[300px] sm:w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>Nhập email và mật khẩu để đăng nhập</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={user.username} // Changed to username for consistency
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
                setErrors({ ...errors, username: "" });
              }}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrors({ ...errors, password: "" });
              }}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button disabled={!user.username || !user.password} onClick={onLogin}>
            Đăng nhập
          </Button>
          <Link href="/signup">
            <Button variant="outline">Đăng ký</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
