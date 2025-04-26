import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const directoryPath = path.join(process.cwd(), "files"); // Adjust the path as needed

export async function POST(request: Request) {
  const { fileName } = await request.json();
  const content = ""; // Default content is empty
  const fileExtension = ".txt"; // Default file extension is .txt
  const filePath = path.join(directoryPath, fileName + fileExtension);

  if (!fileName) {
    return NextResponse.json(
      { error: "File name is required" },
      { status: 400 }
    );
  }

  try {
    fs.writeFileSync(filePath, content);
    return NextResponse.json(
      { message: "File saved successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Error saving file" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const files = fs.readdirSync(directoryPath);
    const txtFiles = files.filter(file => file.endsWith('.txt')); // Filter to only include .txt files
    return NextResponse.json(txtFiles);
  } catch {
    return NextResponse.json(
      { error: "Error retrieving files" },
      { status: 500 }
    );
  }
}
export async function PUT(request: Request) {
  const { oldFileName, newFileName } = await request.json();

  if (!oldFileName || !newFileName) {
    return NextResponse.json(
      { error: "Old file name and new file name are required" },
      { status: 400 }
    );
  }

  const fileExtension = ".txt"; // Default file extension is .txt
  const oldFilePath = path.join(directoryPath, oldFileName + fileExtension);
  const newFilePath = path.join(directoryPath, newFileName + fileExtension);

  try {
    fs.renameSync(oldFilePath, newFilePath); // Rename the old file to the new file name
    return NextResponse.json(
      { message: "File renamed successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error renaming file" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { fileName } = await request.json();

  if (!fileName) {
    return NextResponse.json(
      { error: "File name is required" },
      { status: 400 }
    );
  }

  const filePath = path.join(directoryPath, fileName);

  try {
    fs.unlinkSync(filePath); // Delete the file
    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error deleting file" }, { status: 500 });
  }
}
