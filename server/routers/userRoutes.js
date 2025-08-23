import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/activate/:token", userController.activateUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);
router.post("/change-password", userController.changeUserPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

export default router;
