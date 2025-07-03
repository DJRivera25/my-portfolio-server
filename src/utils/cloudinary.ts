import { v2 as cloudinary, ConfigOptions } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig: ConfigOptions = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
};

cloudinary.config(cloudinaryConfig);

// Storage config for both images and raw files (PDFs)
export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isPdf = file.mimetype === "application/pdf";

    return {
      folder: isPdf ? "resumes" : "portfolio",
      resource_type: isPdf ? "raw" : "image", // PDF must be uploaded as raw
      format: isPdf ? "pdf" : undefined,
      public_id: `${isPdf ? "Derem-Joshua-Rivera-Resume" : `image-${Date.now()}`}`,
      allowed_formats: isPdf ? ["pdf"] : ["jpg", "jpeg", "png", "webp"],
      transformation: isPdf ? undefined : [{ width: 800, crop: "limit" }],
    };
  },
});

export default cloudinary;
