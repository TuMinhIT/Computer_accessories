// import express from "express";
// import userController from "../controllers/userController.js";
// import authUser from "../middleware/authUser.js"; 
// const router = express.Router();

// router.get("/activate/:token", userController.activateUser);
// router.post("/login", userController.loginUser);
// router.put("/:id", userController.updateUser);
// router.post("/change-password", userController.changeUserPassword);
// router.post("/forgot-password", userController.forgotPassword);
// router.post("/reset-password", userController.resetPassword);

// router.get("/profile", authUser, userController.getProfile);
// router.put("/profile", authUser, userController.updateProfile);

// export default router;
import express from "express";
import userController from "../controllers/userController.js";
import authUser from "../middleware/authUser.js"; 

const router = express.Router();

// ✅ Auth / Account
router.get("/activate/:token", userController.activateUser);
router.post("/login", userController.loginUser);
router.post("/change-password", userController.changeUserPassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

// ✅ Profile (đặt TRƯỚC /:id để tránh bị nuốt)
router.get("/profile", authUser, userController.getProfile);
router.put("/profile", authUser, userController.updateProfile);

// ✅ Update user by ID (Admin)
router.put("/:id", userController.updateUser);

export default router;
