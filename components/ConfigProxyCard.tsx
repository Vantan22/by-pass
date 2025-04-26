"use client";
import config from "@/files/configs/config.json";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import FileSelect from "./FileSelect";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
export default function ConfigProxyCard({ className }: { className?: string }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const handleFileSelect = async (file: string) => {
    setSelectedFile(file);
  };
  const handleSaveConfig = async () => {
    if (!selectedFile) {
      toast.error("No file selected.");
      return;
    }

    const response = await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputFileName: selectedFile,
      }),
    });
    if (response.ok) {
      toast.success("Config saved successfully");
    } else {
      toast.error("Error saving config");
    }
  };

  return (
    <>
      <div className={cn("flex w-full flex-col gap-8", className)}>
        <Card className="w-full">
          <CardHeader className="flex flex-col md:flex-row justify-between items-center">
            <CardTitle className="text-lg md:text-xl">
              Danh sách cấu hình
            </CardTitle>
            <div className="flex items-center">
              <CardTitle className="text-sm md:text-base mr-2">
                File input đang dùng:
              </CardTitle>
              <span className="font-semibold text-blue-500">
                {config.inputFile}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <FileSelect onFilesSelected={handleFileSelect} />
          </CardContent>
          <CardFooter>
            <Button
              size="lg"
              className="w-full md:w-auto"
              onClick={handleSaveConfig}
            >
              Lưu cấu hình
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Chú ý</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Cấu hình này sẽ được sử dụng để tạo cấu hình cho proxy.</p>
            <p>
              thêm mỗi dòng là 1 proxy , ví dụ: 127.0.0.1:8080,
              127.0.0.1:8081:username:password
            </p>
            <p>các cấu hình này sẽ được sử dụng để tạo cấu hình cho proxy.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
