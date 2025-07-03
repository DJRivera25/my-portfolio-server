import express from "express";
import multer from "multer";
import { getSocials, createSocial, deleteSocial, updateSocial } from "../controllers/socialController.js";
import upload from "../middlewares/upload.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSocials);
router.post("/", protect, upload.single("icon"), createSocial);
router.put("/:id", protect, upload.single("icon"), updateSocial);
router.delete("/:id", protect, deleteSocial);

export default router;
