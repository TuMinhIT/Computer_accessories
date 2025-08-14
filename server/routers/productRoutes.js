// server/routers/productRoutes.js
import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = express.Router();

// router.get('/', auth, getAllProducts);
// router.post('/', auth, createProduct);
// router.put('/:id', auth, updateProduct);
// router.delete('/:id', auth, deleteProduct);

router.get("/", getAllProducts);
router.post("/", upload.array("images", 10), createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
