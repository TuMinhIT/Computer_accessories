import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} from "../controllers/categoryController.js";
import { checkAccessToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:id", getCategory);
router.get("/", getCategories);
router.post("/", checkAccessToken, checkRole(['admin']), createCategory);
router.put("/:id", checkAccessToken, checkRole(['admin']), updateCategory);
router.delete("/:id", checkAccessToken, checkRole(['admin']), deleteCategory);

export default router;
