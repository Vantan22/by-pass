"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    const storedUsername = document.cookie
      .split("; ")
      .find((row) => row.startsWith("by_pass_local="))
      ?.split("=")[1];

    // Check if user is logged in based on session storage
    if (storedUsername ) {
      router.push("/");
    }
  }, [router]);

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: "",
      password: "",
    };

    // Username validation
    if (!user.username) {
      newErrors.username = "Username không được để trống";
      isValid = false;
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "Mật khẩu không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onLogin = () => {
    // Hardcoded user data
    const hardcodedUser = {
      username: "admin",
      password: "admin",
    };

    if (validateForm()) {
      if (
        user.username === hardcodedUser.username &&
        user.password === hardcodedUser.password
      ) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to 1 day
        document.cookie = `by_pass_local=${JSON.stringify({
          username: user.username,
          password: user.password,
        })}; path=/; expires=${expirationDate.toUTCString()}`;
        toast.success("Đăng nhập thành công");
        router.push("/");
      } else {
        toast.error("Username hoặc mật khẩu không đúng");
      }
    } else {
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <Card className="flex items-center justify-center h-screen">
      <CardContent className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h4 className="text-2xl font-bold text-center">Đăng nhập</h4>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="username"
              value={user.username}
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
          <CardFooter className="flex justify-between">
            <Button
              className="w-full"
              disabled={!user.username || !user.password}
              onClick={onLogin}
            >
              Đăng nhập
            </Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
