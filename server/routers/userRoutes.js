import express from "express";
import cors from "cors"; 
import userController from "../controllers/userController.js";
import authUser from "../middleware/authUser.js"; 
import upload from "../middleware/multer.js";
const router = express.Router();
router.use(cors({ origin: "*" }));


router.get("/activate/:token", userController.activateUser);
router.post("/login", userController.loginUser);
router.post("/change-password", userController.changeUserPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.get("/profile", authUser, userController.getProfile);
router.put("/profile", authUser, upload.single("avatar"), userController.updateProfile);

router.put("/:id", userController.updateUser);

export default router;
