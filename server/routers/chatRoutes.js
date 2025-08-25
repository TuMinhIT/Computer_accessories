import express from "express";
import adminAuth from "../middleware/authAdmin.js";
import {
  getMyConversationWithAdmin,
  getMessages,
  markRead,
  adminUnreadByEmployee,
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/me", adminAuth, getMyConversationWithAdmin);
router.get("/messages/:conversationId", adminAuth, getMessages);
router.post("/mark-read/:conversationId", adminAuth, markRead);

router.get("/admin/unread", adminAuth, adminUnreadByEmployee);

export default router;
