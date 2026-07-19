import express from "express";
import cors from "cors";
import userController from "../controllers/userControllerOLD.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";
import { checkAuth } from "../middleware/auth.js";
const router = express.Router();
router.use(cors({ origin: "*" }));

router.post("/register", userController.addUser);
router.get("/activate/:token", checkAuth, userController.activateUser);
router.post("/login", userController.loginUser);
router.post("/change-password", userController.changeUserPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get("/profile", authUser, userController.getProfile);
router.put("/profile", authUser, upload.single("avatar"), userController.updateProfile);

router.put("/:id", userController.updateUser);

export default router;
