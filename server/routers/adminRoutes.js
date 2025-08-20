import express from "express";
import {
  login,
} from "../controllers/userController.js";

import { adminProfile } from "../controllers/AdminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { logout } from "../controllers/userController.js";
import adminAuth from "../middleware/authAdmin.js";

const router = express.Router();
router.post("/admin-login", login);
router.post("/adminProfile", adminAuth, adminProfile);
// router.post("/create-staff", protect, adminOnly, createStaff);
// router.get("/activate/:token", activateAccount);
// router.post("/change-password", changePassword);

export default router;
