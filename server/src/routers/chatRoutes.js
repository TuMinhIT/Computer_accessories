// import express from "express";
// import { getMyConversation, getMessages } from "../controllers/chatController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/me", protect, getMyConversation);
// router.get("/messages/:conversationId", protect, getMessages);


// export default router;
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMyConversation, getMessages, getAllConversations, markConversationSeen } from "../controllers/chatController.js";

const router = express.Router();

// employee
router.get("/me", protect, getMyConversation);  
router.get("/messages/:conversationId", protect, getMessages);

// admin
router.get("/conversations", protect, getAllConversations); 
router.post("/seen", protect, markConversationSeen);

export default router;
