import express from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", getBrands);
router.post("/", adminAuth, upload.single("image"), createBrand);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

export default router;
