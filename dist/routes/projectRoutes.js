import { Router } from "express";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js"; // ⛨ Import protect middleware
const router = Router();
// 🟢 Public: Get all projects
router.get("/", getProjects);
// 🔐 Protected: Create a new project (with image)
router.post("/", protect, upload.single("image"), createProject);
// ✏️ 🔐 Protected: Update a project (optionally with new image)
router.put("/:id", protect, upload.single("image"), updateProject);
// 🗑️ 🔐 Protected: Delete a project
router.delete("/:id", protect, deleteProject);
export default router;
