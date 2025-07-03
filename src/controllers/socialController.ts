import { Request, Response } from "express";
import Social from "../models/Social.js";

// 🔍 GET all socials
export const getSocials = async (_req: Request, res: Response) => {
  try {
    const socials = await Social.find().sort({ createdAt: -1 });
    res.json(socials);
  } catch (error) {
    console.error("❌ Error fetching socials:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🆕 POST new social media link
export const createSocial = async (req: Request, res: Response) => {
  try {
    const { platform, url } = req.body;
    const icon = (req.file as Express.Multer.File)?.path;

    if (!platform || !url || !icon) {
      res.status(400).json({ message: "All fields including icon are required" });
      return;
    }

    const newSocial = new Social({ platform, icon, url });
    const saved = await newSocial.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating social:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ PUT update social media link
export const updateSocial = async (req: Request, res: Response) => {
  try {
    const { platform, url } = req.body;
    const icon = (req.file as Express.Multer.File)?.path;

    const social = await Social.findById(req.params.id);
    if (!social) {
      res.status(404).json({ message: "Social media link not found" });
      return;
    }

    social.platform = platform || social.platform;
    social.url = url || social.url;
    if (icon) social.icon = icon;

    const updated = await social.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating social:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ DELETE
export const deleteSocial = async (req: Request, res: Response) => {
  try {
    const social = await Social.findById(req.params.id);
    if (!social) {
      res.status(404).json({ message: "Social media link not found" });
      return;
    }

    await social.deleteOne();
    res.status(200).json({ message: "Social media link deleted" });
  } catch (error) {
    console.error("❌ Error deleting social:", error);
    res.status(500).json({ message: "Server error" });
  }
};
