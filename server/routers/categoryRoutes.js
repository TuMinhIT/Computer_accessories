import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/add", createCategory);
router.post("/update", updateCategory);
router.post("/delete", deleteCategory);

export default router;
