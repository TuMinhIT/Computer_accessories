import express from "express";
import userController from "../controllers/userController.js";
import authUser from "../middleware/authUser.js"; 

const router = express.Router();

router.get("/activate/:token", userController.activateUser);
router.post("/login", userController.loginUser);
router.post("/change-password", userController.changeUserPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get("/profile", authUser, userController.getProfile);
router.put("/profile", authUser, userController.updateProfile);

router.put("/:id", userController.updateUser);

export default router;
