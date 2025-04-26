import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  const { inputFileName, resourceProxies, domainRules, outputProxies } =
    await request.json();

  const date = new Date().toISOString();

  // Define unique paths for saving files with date in the filename
  const domainPath = path.join(
    process.cwd(),
    "files/domain",
    `${date}_domain.txt`
  );
  const resourcePath = path.join(
    process.cwd(),
    "files/resource",
    `${date}_resource.txt`
  );
  const outputPath = path.join(
    process.cwd(),
    "files/output",
    `${date}_output.txt`
  );
  const configPath = path.join(
    process.cwd(),
    "files/configs",
    `${date}_config.json`
  );
  // Save domain, resource, and output files
  fs.writeFileSync(domainPath, domainRules);
  fs.writeFileSync(resourcePath, resourceProxies);
  fs.writeFileSync(outputPath, outputProxies);

  // Create a configuration object
  const config = {
    inputFile: inputFileName,
    domainFile: path.basename(domainPath),
    resourceFile: path.basename(resourcePath),
    outputFile: path.basename(outputPath),
  };

  // Save the configuration as a JSON file
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  return NextResponse.json({ message: "Files saved successfully" });
}
