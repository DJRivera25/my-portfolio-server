import { Router } from "express";
import { getTools, createTool, updateTool, deleteTool } from "../controllers/toolController.js";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";
const router = Router();
// 🟢 Public: Get all tools
router.get("/", getTools);
// 🔐 Protected: Create new tool
router.post("/", protect, upload.single("icon"), createTool);
// 🔐 Protected: Update tool
router.put("/:id", protect, upload.single("icon"), updateTool);
// 🔐 Protected: Delete tool
router.delete("/:id", protect, deleteTool);
export default router;
