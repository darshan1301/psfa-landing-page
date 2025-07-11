import { NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { uploadToS3 } from "@/lib/generatePresignedUrl";

export async function POST(request: NextRequest) {
  console.log("Received upload request");
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "images";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Size check (1MB = 1024 * 1024 bytes)
    if (file.size > 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 1MB limit" },
        { status: 400 }
      );
    }

    const url = await uploadToS3(file, folder);

    return NextResponse.json({
      success: true,
      url,
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Upload failed",
      },
      { status: 500 }
    );
  }
}

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const imageUrl = body.imageUrl;
    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image URL provided" },
        { status: 400 }
      );
    }

    const bucketName = process.env.S3_BUCKET_NAME!;
    let key: string;

    try {
      const url = new URL(imageUrl);

      // Handle different S3 URL formats
      if (url.hostname.includes(bucketName)) {
        // Format: https://bucket-name.s3.region.amazonaws.com/folder/filename
        key = url.pathname.substring(1); // Remove leading slash
      } else if (url.hostname.startsWith("s3.")) {
        // Format: https://s3.region.amazonaws.com/bucket-name/folder/filename
        const pathParts = url.pathname.split("/");
        key = pathParts.slice(2).join("/"); // Remove leading slash and bucket name
      } else {
        throw new Error("Invalid S3 URL format");
      }
      console.log("key:", key);
    } catch {
      return NextResponse.json(
        { error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    console.log(bucketName);

    // Delete the object from S3
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      deletedUrl: imageUrl,
    });
  } catch (error) {
    console.error("Delete API error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Delete failed",
      },
      { status: 500 }
    );
  }
}

// Client-side usage
// const deleteImage = async (imageUrl) => {
//   const response = await fetch(`/api/delete-image?url=${encodeURIComponent(imageUrl)}`, {
//     method: 'DELETE',
//   });

//   const result = await response.json();
//   console.log(result);
// };
