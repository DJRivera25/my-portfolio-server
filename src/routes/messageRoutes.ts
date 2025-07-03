import { Router } from "express";
import { getMessages, createMessage, markMessageAsSeen, deleteMessage } from "../controllers/messageController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

// 🔐 Protected: Admin only - view all messages
router.get("/", protect, getMessages);

// 🟢 Public: Anyone can send a message
router.post("/", createMessage);

router.patch("/:id/viewed", protect, markMessageAsSeen);

router.delete("/:id", protect, deleteMessage);

export default router;
