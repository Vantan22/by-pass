"use client";
import { useState } from "react";
import FileSelect from "./FileSelect";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
export default function InputProxyCard({ className }: { className?: string }    ) {
  const [inputProxies, setInputProxies] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const handleFileSelect = async (file: string) => {
    setSelectedFile(file);
    const fileNameWithoutExtension = file.split(".").slice(0, -1).join("."); // Remove the file extension

    const response = await fetch("/api/file?name=" + fileNameWithoutExtension);
    const data = await response.json();
    setInputProxies(data.content);
  };

  const handleSaveInputProxy = async () => {
    const fileNameWithoutExtension = selectedFile
      ?.split(".")
      .slice(0, -1)
      .join("."); // Remove the file extension

    if (!selectedFile || !inputProxies) {
      console.error("Selected file or input proxies are missing.");
      return;
    }

    const response = await fetch("/api/file", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fileNameWithoutExtension,
        newData: inputProxies,
      }),
    });

    if (response.ok) {
      toast.success("Data updated successfully");
    } else {
      const errorData = await response.json();
      toast.error("Error updating data:", errorData.error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputProxies(value);
  };

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Input Proxy</CardTitle>
        <FileSelect onFilesSelected={handleFileSelect} />{" "}
      </CardHeader>
      <CardContent>
        <Textarea
          className="w-full h-64"
          placeholder=" thêm mỗi dòng là 1 proxy , ví dụ: 127.0.0.1:8080, 127.0.0.1:8081:username:password"
          value={inputProxies}
          onChange={handleInputChange}
        />
      </CardContent>
      <CardFooter>
        <Button
          disabled={!selectedFile || !inputProxies}
          size="lg"
          variant="default"
          className="mt-2"
          onClick={handleSaveInputProxy}
        >
          Lưu
        </Button>
      </CardFooter>
    </Card>
  );
}
