import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const { inputFileName } = await request.json();

  // Define fixed paths for saving files
  const domainPath = path.join(process.cwd(), "files/domain", "rules.txt");
  const resourcePath = path.join(
    process.cwd(),
    "files/resource",
    "resource_proxy.txt"
  );
  const outputPath = path.join(
    process.cwd(),
    "files/output",
    "output_proxy.txt"
  );
  const configPath = path.join(process.cwd(), "files/configs", "config.json");

  const config = {
    inputFile: inputFileName, // Fixed input file name
    domainFile: path.basename(domainPath),
    resourceFile: path.basename(resourcePath),
    outputFile: path.basename(outputPath),
  };

  // Save the configuration as a JSON file (overwriting if it exists)
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return NextResponse.json({ message: "Files saved successfully" });
}

export async function GET() {
  const configDir = path.join(process.cwd(), "files/configs");
  const files = fs.readdirSync(configDir);

  const configs = files.map((file) => {
    const filePath = path.join(configDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    return {
      fileName: file,
      content: JSON.parse(content),
    };
  });

  return NextResponse.json(configs);
}
export async function PUT(request: Request) {
  const { oldFileName, newFileName } = await request.json();
  const configDir = path.join(process.cwd(), "files/configs");
  const oldFilePath = path.join(configDir, oldFileName);
  const newFilePath = path.join(configDir, newFileName);

  // Check if the old file exists
  if (!fs.existsSync(oldFilePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  // Read the content of the old config file
  const content = fs.readFileSync(oldFilePath, "utf-8");
  const config = JSON.parse(content);

  // Update the file name in the config object
  config.fileName = newFileName;

  // Write the updated config to a new file
  fs.writeFileSync(newFilePath, JSON.stringify(config, null, 2));

  // Remove the old file
  fs.unlinkSync(oldFilePath);

  return NextResponse.json({ message: "Config updated successfully" });
}
