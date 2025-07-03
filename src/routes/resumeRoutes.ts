import { Router } from "express";
import { uploadResume, getLatestResume } from "../controllers/resumeController.js";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/", protect, upload.single("resume"), uploadResume);
router.get("/", getLatestResume);

export default router;
