import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req: NextRequest) {
  try {
    // 1. Get form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 2. Read file data
    const bytes = await file.arrayBuffer(); // Convert to ArrayBuffer
    const buffer = Buffer.from(bytes); // Convert to Buffer

    // 3. Create random name with extension
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    // 4. Save to public/uploads/
    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await fs.writeFile(filePath, buffer);
    // 5. Return public URL
    const fileUrl = `/uploads/${fileName}`;
    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
