import { NextRequest, NextResponse } from "next/server";

import { uploadToS3, deleteFromS3 } from "@/lib/generatePresignedUrl";

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

    await deleteFromS3(imageUrl);

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
