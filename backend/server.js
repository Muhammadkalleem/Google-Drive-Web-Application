import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import upload from './middleware/uploadMiddleware.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve uploads folder
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/uploads", express.static(path.join("uploads"))); // ✅ This exposes files

// ✅ CORRECT CORS SETUP
app.use(cors({
  origin: 'http://localhost:5173', // ✅ REACT frontend port (Vite usually uses 5173)
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
//app.use('/uploads', express.static('uploads'));
app.use("/uploads", express.static("uploads"));

app.use('/api/uploads', express.static('uploads'));



// Other routes and middleware...



// ✅ Routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
