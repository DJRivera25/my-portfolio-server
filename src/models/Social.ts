import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    icon: { type: String, required: true }, // Cloudinary URL
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Social", socialSchema);
