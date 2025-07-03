import { Request, Response } from "express";
import Project from "../models/Project.js";

// 🔍 GET all projects
export const getProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🆕 POST new project
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, link } = req.body;
    const image = (req.file as Express.Multer.File)?.path;

    if (!title || !description || !link || !image) {
      res.status(400).json({ message: "All fields including image are required" });
      return;
    }

    const newProject = new Project({ title, description, link, image });
    const saved = await newProject.save();

    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🗑️ DELETE a project by ID
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    await project.deleteOne();
    res.status(200).json({ message: "Project deleted" });
  } catch (error) {
    console.error("❌ Error deleting project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✏️ PUT (update) a project by ID
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, link } = req.body;
    const image = (req.file as Express.Multer.File)?.path;

    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.link = link || project.link;
    if (image) project.image = image;

    const updated = await project.save();
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};
