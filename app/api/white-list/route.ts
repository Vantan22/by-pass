import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const whiteListPath = path.join(
  process.cwd(),
  "files/white-list",
  "white_list.txt"
);

export async function GET() {
  if (!fs.existsSync(whiteListPath)) {
    return NextResponse.json(
      { error: "White list not found" },
      { status: 404 }
    );
  }

  const content = fs.readFileSync(whiteListPath, "utf-8");
  const whiteList = content.split("\n").filter(Boolean); // Split by new line and filter out empty lines
  return NextResponse.json({ items: whiteList });
}

export async function POST(request: Request) {
  const { items } = await request.json();

  // Check if items is a string and not empty
  if (typeof items !== "string" || items.trim() === "") {
    return NextResponse.json(
      { error: "Invalid input: items must be a non-empty string" },
      { status: 400 }
    );
  }

  // Check if the white list file exists, if not create it
  if (!fs.existsSync(whiteListPath)) {
    fs.writeFileSync(whiteListPath, "", "utf-8"); // Create the file if it doesn't exist
  }

  // Save the white list items to a text file
  fs.writeFileSync(whiteListPath, items, "utf-8");
  return NextResponse.json({ message: "White list saved successfully" });
}
