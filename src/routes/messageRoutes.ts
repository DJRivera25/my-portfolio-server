import { Router } from "express";
import { getMessages, createMessage } from "../controllers/messageController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

// 🔐 Protected: Admin only - view all messages
router.get("/", protect, getMessages);

// 🟢 Public: Anyone can send a message
router.post("/", createMessage);

export default router;
