import multer from "multer";

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp"); // Folder where files will be temporarily stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


export const upload = multer({ storage });
