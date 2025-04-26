"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Importing the single select component
import { useEffect, useState } from "react";

const FileSelect = ({
  onFilesSelected,
}: {
  onFilesSelected: (file: string) => void;
}) => {
  const [fileInputProxies, setFileInputProxies] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchFileInputProxies = async () => {
      const response = await fetch("/api/config"); // Changed to fetch from /api/config
      const data = await response.json();
      const formattedFileInputProxies = data.map((file: { fileName: string }) => ({
        value: file.fileName,
        label: file.fileName,
      }));
      setFileInputProxies(formattedFileInputProxies);
    };

    fetchFileInputProxies();
  }, []);

  const handleFileSelect = (file: string) => {
    onFilesSelected(file); // Pass the selected file to parent
  };

  return (
    <Select onValueChange={handleFileSelect}>
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Select a file" />
      </SelectTrigger>
      <SelectContent>
        {fileInputProxies.map((fileInputProxy) => (
          <SelectItem
            className="cursor-pointer"
            key={fileInputProxy.value}
            value={fileInputProxy.value}
          >
            {fileInputProxy.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FileSelect;
