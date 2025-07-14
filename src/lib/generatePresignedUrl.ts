import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

// S3 Configuration
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;
const MAX_FILE_SIZE = 1024 * 1024; // 1MB in bytes

// Server-side upload function
export async function uploadToS3(
  file: File,
  folder: string = "psfa"
): Promise<string> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 1MB limit");
  }

  // Validate file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed"
    );
  }

  // Generate unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split(".").pop();
  const fileName = `${folder}/${timestamp}-${randomString}.${extension}`;

  try {
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    // Return the public URL
    return `https://${BUCKET_NAME}.s3.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 upload error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// Generate presigned URL for client-side upload (alternative approach)
export async function generatePresignedUrl(
  fileName: string,
  fileType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
    ACL: "public-read",
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour expiry
}

export async function deleteFromS3(
  imageUrl: string
): Promise<{ success: boolean; message?: string }> {
  const bucketName = process.env.S3_BUCKET_NAME!;
  let key: string;

  try {
    const url = new URL(imageUrl);

    if (url.hostname.includes(bucketName)) {
      // Format: https://bucket-name.s3.region.amazonaws.com/folder/filename
      key = url.pathname.substring(1);
    } else if (url.hostname.startsWith("s3.")) {
      // Format: https://s3.region.amazonaws.com/bucket-name/folder/filename
      const pathParts = url.pathname.split("/");
      key = pathParts.slice(2).join("/");
    } else {
      throw new Error("Invalid S3 URL format");
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3Client.send(deleteCommand);

    return { success: true, message: "Image deleted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("S3 Deletion Error:", error.message);
      return { success: false, message: error.message };
    } else {
      console.error("Unknown error during S3 deletion:", error);
      return { success: false, message: "Unknown error occurred" };
    }
  }
}
