import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import connectCloudinary from "../config/cloudinary.js";

// config storage for multer with cloudinary
const storage = new CloudinaryStorage({
  cloudinary: connectCloudinary,
  params: {
    folder: "e-commerce", // name  folder
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage: storage });

export default upload;
