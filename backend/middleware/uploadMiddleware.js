import multer from "multer";
import path from "path";

// Set destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

// Accept only files < 10MB
const upload = multer({ storage });

export default upload;
