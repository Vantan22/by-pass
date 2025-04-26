import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "files/rules", "rules.txt"); // Fixed path and filename

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
    return NextResponse.json({ error: "Data is required" }, { status: 400 });
  }

  try {
    // Create the file if it doesn't exist
    fs.writeFileSync(filePath, "", { flag: 'a' }); // Append mode to create the file if it doesn't exist
    fs.writeFileSync(filePath, newData, "utf-8"); // Update the file with new data
    return NextResponse.json(
      { message: "Data updated successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}
