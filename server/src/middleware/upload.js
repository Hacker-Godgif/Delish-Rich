import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if it doesn't exist
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname).toLowerCase()
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log("========== FILE DEBUG ==========");
  console.log("Original Name:", file.originalname);
  console.log("Mime Type:", file.mimetype);
  console.log("Extension:", path.extname(file.originalname));
  console.log("===============================");

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;