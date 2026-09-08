import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import FileAsset from "@/models/FileAsset";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return new NextResponse("File ID required", { status: 400 });
    }

    // Strip .pdf extension if present
    const cleanId = id.replace(/\.pdf$/i, "").trim();

    await connectDB();

    let file = null;
    if (mongoose.Types.ObjectId.isValid(cleanId)) {
      file = await FileAsset.findById(cleanId);
    }
    if (!file) {
      file = await FileAsset.findOne({ filename: cleanId });
    }

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    const filename = file.filename || "document.pdf";
    const contentType = file.contentType || "application/pdf";

    // Encode filename for Content-Disposition header
    const encodedFilename = encodeURIComponent(filename);

    return new NextResponse(file.data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(file.size || file.data.length),
        "Content-Disposition": `inline; filename="${filename}"; filename*=${encodedFilename}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error serving file:", error);
    return new NextResponse(error.message || "Failed to retrieve file", {
      status: 500,
    });
  }
}
