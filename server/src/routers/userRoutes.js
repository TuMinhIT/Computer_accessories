import express from "express";
import { RegisterUser, loginUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/User.controller.js";
import validate from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";
import { checkAccessToken, checkRole } from "../middleware/auth.middleware.js";
const router = express.Router();


router.get("/", checkAccessToken, checkRole(['admin']), getUsers);
router.delete("/:id", checkAccessToken, checkRole(['admin']), deleteUser);
router.put("/:id", checkAccessToken, checkRole(['admin']), updateUser);



router.post("/register", validate(registerSchema), RegisterUser);

// router.get("/activate/:token", checkAuth, userController.activateUser);
router.post("/login", validate(loginSchema), loginUser);
// router.post("/change-password", userController.changeUserPassword);
// router.post("/forgot-password", userController.forgotPassword);
// router.post("/reset-password", userController.resetPassword);

router.get("/profile", checkAccessToken, getUser);
// router.put("/profile", authUser, upload.single("avatar"), userController.updateProfile);

// router.put("/:id", userController.updateUser);



export default router;
