"use client";
import FileSelect from "@/components/FileSelect"; // Importing FileSelect component
import FileTable from "@/components/FileTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [inputProxies, setInputProxies] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const [resourceProxies, setResourceProxies] = useState("");
  const [domainRules, setDomainRules] = useState("");
  const [outputProxies, setOutputProxies] = useState("");
  const [wishList, setWishList] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputProxies(value);

    const output = value
      .split("\n")
      .map((line: string) => {
        const parts = line.split(":");
        return parts.length === 2
          ? `${parts[0]}:${parts[1]}`
          : parts.length === 4
          ? `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}`
          : "";
      })
      .join("\n");

    setOutputProxies(output);
  };

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
      console.log("Data updated successfully");
    } else {
      const errorData = await response.json();
      console.error("Error updating data:", errorData.error);
    }
  };

  const handleSaveConfig = async () => {
    const response = await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputFileName: selectedFile,
        resourceProxies: resourceProxies,
        domainRules: domainRules,
        outputProxies: outputProxies,
      }),
    });

    if (response.ok) {
      console.log("Config saved successfully");
    } else {
      const errorData = await response.json();
      console.error("Error saving config:", errorData.error);
    }
  };

  const handleSaveWishList = async () => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wishList: wishList,
      }),
    });

    if (response.ok) {
      console.log("Wish list saved successfully");
    } else {
      const errorData = await response.json();
      console.error("Error saving wish list:", errorData.error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-screen p-8 bg-gray-200">
        <FileTable />

        <Card className="col-span-1">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Input Proxy</CardTitle>
            <FileSelect onFilesSelected={handleFileSelect} />{" "}
            {/* Pass selectedFile to FileSelect */}
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-32"
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
              Lưu Cấu Hình
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Resource Proxy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-24"
              placeholder="Enter Resource Proxy..."
              value={resourceProxies}
              onChange={(e) => setResourceProxies(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Domain Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-24"
              placeholder="Enter Domain Rules..."
              value={domainRules}
              onChange={(e) => setDomainRules(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Output Proxy</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-24"
              placeholder="Enter Output Proxy..."
              value={outputProxies}
              onChange={(e) => setOutputProxies(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="col-span-2 flex justify-center">
          <Button size="lg" onClick={handleSaveConfig}>
            Lưu cấu hình
          </Button>
        </div>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Whitelist</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="w-full h-24"
              placeholder="Enter your whitelist items..."
              value={wishList}
              onChange={(e) => setWishList(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button size="lg" onClick={handleSaveWishList}>
              Lưu danh sách trắng
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
