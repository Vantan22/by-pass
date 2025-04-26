import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "files/output", "output_proxy.txt"); // Fixed path and filename

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf-8"); // Read the file content
    return NextResponse.json({ content: data }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Error reading file" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { newData } = await request.json();

  if (newData === undefined) {
    return NextResponse.json(
      { error: "Data is required" },
      { status: 400 }
    );
  }

  try {
    // Check if the file exists, if not create it
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "", "utf-8"); // Create the file if it doesn't exist
    }
    fs.writeFileSync(filePath, newData, "utf-8"); // Update the file with new data
    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
