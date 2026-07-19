import express from "express";
import cors from "cors";
import { RegisterUser, loginUser } from "../controllers/User.controller.js";
import validate from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";
const router = express.Router();

router.post("/register", validate(registerSchema), RegisterUser);

// router.get("/activate/:token", checkAuth, userController.activateUser);
router.post("/login", validate(loginSchema), loginUser);
// router.post("/change-password", userController.changeUserPassword);
// router.post("/forgot-password", userController.forgotPassword);
// router.post("/reset-password", userController.resetPassword);

// router.get("/profile", authUser, userController.getProfile);
// router.put("/profile", authUser, upload.single("avatar"), userController.updateProfile);

// router.put("/:id", userController.updateUser);

export default router;
