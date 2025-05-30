// components/FileTable.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
const FileTable = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [fileToEdit, setFileToEdit] = useState("");
  const [fileToDelete, setFileToDelete] = useState("");

  const fetchFiles = async () => {
    const response = await fetch("/api/files");
    const data = await response.json();
    setFiles(
      data.map((file: string) => file.split(".").slice(0, -1).join("."))
    ); // Remove file extension
  };

  const handleAddFile = async () => {
    if (newFileName === "") {
      toast.error("New file name cannot be empty");
      return false; // Prevent empty file names
    }
    const response = await fetch("/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: newFileName }),
    });

    if (response.ok) {
      toast.success("File added successfully");
      setIsAddDialogOpen(false);
      setNewFileName(""); // Clear input after successful addition
      fetchFiles(); // Refresh the file list
    } else {
      const errorData = await response.json();
      toast.error("Error adding file:", errorData.error);
    }
  };

  const handleDeleteFile = async () => {
    console.log(fileToDelete);
    const response = await fetch("/api/files", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileName: fileToDelete }),
    });
    if (response.ok) {
      toast.success("File deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchFiles(); // Refresh the file list
    } else {
      const errorData = await response.json();
      toast.error("Error deleting file:", errorData.error);
    }
  };

  const handleEditFile = async () => {
    if (newFileName === "") {
      toast.error("New file name cannot be empty");
      return false; // Prevent empty file names
    }

    const response = await fetch("/api/files", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldFileName: fileToEdit, newFileName }), // Removed content as it's not needed
    });

    if (response.ok) {
      toast.success("File edited successfully");
      setIsEditDialogOpen(false);
      setNewFileName(""); // Clear input after successful edit
      fetchFiles(); // Refresh the file list
    } else {
      const errorData = await response.json();
      toast.error("Error editing file:", errorData.error);
    }
  };

  useEffect(() => {
    fetchFiles(); // Fetch files on component mount
  }, []);

  return (
    <Card className="col-span-1 w-full md:col-span-2">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Danh sách Files</CardTitle>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsAddDialogOpen(true)}
        >
          Thêm file
        </Button>
      </CardHeader>
      <CardContent>
        <Card className="min-w-full p-4">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file}>
                  <TableCell className="w-2/3">{file}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFileToEdit(file);
                        setNewFileName(file);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setFileToDelete(file);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </CardContent>

      {/* Dialog for adding a new file */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogTitle>Add New File</DialogTitle>
          <DialogDescription>
            Nhập tên file mới không cần nhập đuôi file
          </DialogDescription>
          <Input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Enter file name"
          />
          <Button disabled={newFileName === ""} onClick={handleAddFile}>
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing a file */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit File Name</DialogTitle>
          <DialogDescription>Nhập tên file mới</DialogDescription>
          <Input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Enter new file name"
          />
          <Button disabled={newFileName === ""} onClick={handleEditFile}>
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Dialog for confirming file deletion */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa file này?
          </DialogDescription>
          <Button variant="destructive" onClick={handleDeleteFile}>
            Yes, Delete
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default FileTable;
