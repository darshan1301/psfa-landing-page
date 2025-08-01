import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      // {
      //   hostname: "images.unsplash.com",
      // },

      {
        hostname: "my-s3-storage-prathmesh-nagpur.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
