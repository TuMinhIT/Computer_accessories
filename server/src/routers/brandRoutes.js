import express from "express";
import { getBrands, createBrand, updateBrand, deleteBrand } from "../controllers/BrandController.js";
import { checkRole, checkAccessToken } from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.js";
const router = express.Router();

router.get("/", getBrands);

router.post("/", checkAccessToken, checkRole(['admin']), upload.single("image"), createBrand);
router.put("/:id", checkAccessToken, checkRole(['admin']), upload.single("image"), updateBrand);
router.delete("/:id", checkAccessToken, checkRole(['admin']), deleteBrand);

export default router;
