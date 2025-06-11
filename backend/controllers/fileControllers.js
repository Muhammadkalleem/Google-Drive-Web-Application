import File from '../models/File.js';
import fs from "fs";
import path from "path";


export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = {
      originalname: req.file.originalname, // ✅ For display
      filename: req.file.filename,         // ✅ Stored name
      path: req.file.path,
      user: req.user.id
    };
    
    

    // Save file in MongoDB (if you're using a model)
    const savedFile = await File.create(newFile);

    res.status(200).json(savedFile);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getUserFiles = async (req, res) => {
  try {
    const userId =req.user.id
    const files = await File.find({ user: req.user.id });
    res.json(files);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching file ' });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // ✅ Check if user owns the file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized to delete this file" });
    }

    // ✅ Delete file from the filesystem
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error("File deletion error:", err);
        // Not returning here because we still want to remove from DB
      }
    });

    // ✅ Remove file from MongoDB
    //await file.remove();

    await file.deleteOne();

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error while deleting file" });
  }
};
