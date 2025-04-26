import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const directoryPath = path.join(process.cwd(), "files");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const filePath = path.join(directoryPath, name + ".txt"); // Assuming .txt as the default extension

  try {
    const data = fs.readFileSync(filePath, "utf-8"); // Read the file content
    return NextResponse.json({ content: data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error reading file" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { name, newData } = await request.json();

  if (!name || newData === undefined) {
    return NextResponse.json(
      { error: "Name and data are required" },
      { status: 400 }
    );
  }

  const filePath = path.join(directoryPath, name + ".txt"); // Assuming .txt as the default extension

  try {
    fs.writeFileSync(filePath, newData, "utf-8"); // Append new data to the file
    return NextResponse.json(
      { message: "Data added successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error adding data" }, { status: 500 });
  }
}
