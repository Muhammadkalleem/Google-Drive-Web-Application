import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalname: String,           // ✅ Add this line
  filename: String,
  path: String,             // Local path (or cloud URL)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("File", fileSchema);
