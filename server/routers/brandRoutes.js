import express from "express";
import {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", getBrands);
router.post("/", upload.single("image"), createBrand);
router.put("/:id", upload.single("image"), updateBrand);
router.delete("/:id", deleteBrand);

export default router;
