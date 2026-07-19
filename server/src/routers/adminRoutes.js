import express from "express";

import AdminController from "../controllers/AdminController.js";

import userControler from "../controllers/userController.js";

import adminAuth from "../middleware/authAdmin.js";

const router = express.Router();
router.post("/admin-login", AdminController.loginAdmin);
router.post("/adminProfile", adminAuth, AdminController.adminProfile);

router.post("/users", adminAuth, userControler.addUser);
router.get("/users", adminAuth, userControler.getUsers);
router.delete("/users/:id", adminAuth, userControler.deleteUser);
router.put("/users/:id/toggle-block", adminAuth, userControler.toggleBlockUser);
router.put("/users/:id", adminAuth, userControler.updateUser);

// router.get("/users/activate/:token", userControler.activateUser);
router.post(
  "/users/resend-activation",
  adminAuth,
  userControler.resendActivation
);

// router.post("/forgot-password", forgotPassword);
// router.post("/change-password", changeEmployeePassword);
// router.post("/reset-password/:token", resetPassword);

export default router;
