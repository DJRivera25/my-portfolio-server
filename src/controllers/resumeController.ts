import { Request, Response } from "express";
import Resume from "../models/Resume.js";
import cloudinary from "../utils/cloudinary.js";

// POST /api/resume - Upload Resume
export const uploadResume = async (req: Request, res: Response): Promise<void> => {
  const file = req.file as Express.Multer.File;
  const fileUrl = file?.path;
  const publicId = file?.filename;

  if (!fileUrl || !publicId) {
    res.status(400).json({ message: "Resume file is required." });
    return;
  }

  try {
    const prevResume = await Resume.findOne();
    if (prevResume) {
      await Resume.deleteMany();

      const prevPublicId = prevResume.fileUrl?.split("/").pop()?.split(".")[0];
      if (prevPublicId) {
        await cloudinary.uploader.destroy(`resumes/${prevPublicId}`, { resource_type: "raw" });
      }
    }

    await Resume.create({ fileUrl });
    res.status(201).json({ message: "Resume uploaded successfully", url: fileUrl });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).json({ message: "Server error while uploading resume." });
  }
};

// GET /api/resume - Get Latest Resume
export const getLatestResume = async (_req: Request, res: Response): Promise<void> => {
  try {
    const resume = await Resume.findOne().sort({ uploadedAt: -1 });

    if (!resume) {
      res.status(404).json({ message: "No resume found." });
      return;
    }

    res.json({ url: resume.fileUrl });
  } catch (err) {
    console.error("Error fetching resume:", err);
    res.status(500).json({ message: "Server error while fetching resume." });
  }
};
