"use client";
import { useState } from "react";
import FileSelect from "./FileSelect";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ConfigProxyCard() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const handleFileSelect = async (file: string) => {
    setSelectedFile(file);
  };
  const handleSaveConfig = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputFileName: selectedFile,
      }),
    });
  };

  return (
    <>
      <Card className="col-span-1">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle>Danh sách cấu hình</CardTitle>
          <FileSelect onFilesSelected={handleFileSelect} />
        </CardHeader>
        <CardContent>
          <Button size="lg" onClick={handleSaveConfig}>
            Lưu cấu hình
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
