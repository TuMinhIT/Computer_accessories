import express from "express";
import {
  getBrands,

} from "../controllers/brandController.js";

const router = express.Router();

router.get("/", getBrands);
// router.post("/", adminAuth, upload.single("image"), createBrand);
// router.put("/:id", upload.single("image"), updateBrand);
// router.delete("/:id", deleteBrand);

export default router;
