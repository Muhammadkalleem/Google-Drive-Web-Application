import express from "express";
import auth from "../middleware/auth.js";
import { uploadFile, getUserFiles, deleteFile } from "../controllers/fileControllers.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ✅ Upload route with auth and multer middleware
router.post("/upload", auth, upload.single("file"), uploadFile);

// ✅ Get all user files
router.get("/", auth, getUserFiles);

// ✅ Delete file by ID
router.delete("/:id", auth, deleteFile);

export default router;
