import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import projectRoutes from "./routes/projectRoutes.js";
import toolRoutes from "./routes/toolRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

// Load env vars
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI as string;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

if (!MONGO_URI) throw new Error("❌ MONGO_URI not defined in .env");

// Middlewares
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("🌐 Portfolio API is live");
});

// DB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
