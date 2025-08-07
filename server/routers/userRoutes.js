import express from "express";
import {
  login,
  createStaff,
  activateAccount,
  changePassword,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { logout } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/create-staff", protect, adminOnly, createStaff);
router.get("/activate/:token", activateAccount);
router.post("/change-password", changePassword);
router.post("/logout", logout);

export default router;
