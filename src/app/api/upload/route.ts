import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/mongodb";
import FileAsset from "@/models/FileAsset";

function getCloudinaryConfig() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey =
    process.env.CLOUDINARY_API_KEY ||
    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  return { cloudName, apiKey, apiSecret };
}

export async function GET() {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const configured = Boolean(cloudName && apiKey && apiSecret);

  return NextResponse.json({
    configured,
    cloudName: cloudName ? `${cloudName.substring(0, 3)}***` : null,
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image or PDF file provided in request." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf =
      file.type === "application/pdf" ||
      (file.name && file.name.toLowerCase().endsWith(".pdf"));

    // For PDF files, store directly in MongoDB FileAsset to ensure seamless, unrestricted client download
    if (isPdf) {
      await connectDB();
      const savedDoc = await FileAsset.create({
        filename: file.name || "itinerary.pdf",
        contentType: "application/pdf",
        data: buffer,
        size: buffer.length,
      });

      return NextResponse.json({
        url: `/api/files/${savedDoc._id}.pdf`,
        public_id: savedDoc._id.toString(),
        filename: file.name,
        format: "pdf",
        bytes: savedDoc.size,
      });
    }

    // For images, upload to Cloudinary CDN
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

    if (!cloudName || !apiKey || !apiSecret) {
      // Fallback to storing in MongoDB if Cloudinary is not configured
      await connectDB();
      const savedDoc = await FileAsset.create({
        filename: file.name || "image.jpg",
        contentType: file.type || "image/jpeg",
        data: buffer,
        size: buffer.length,
      });

      return NextResponse.json({
        url: `/api/files/${savedDoc._id}`,
        public_id: savedDoc._id.toString(),
        filename: file.name,
        format: file.type,
        bytes: savedDoc.size,
      });
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "royal_tours",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload stream error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url || result.url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
    });
  } catch (error: any) {
    console.error("Upload API route failure:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file." },
      { status: 500 }
    );
  }
}
