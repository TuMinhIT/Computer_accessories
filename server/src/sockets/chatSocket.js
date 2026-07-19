// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import Conversation from "../models/Conversation.js";
// import Message from "../models/Message.js";
// import UserModel from "../models/UserModel.js";

// export function  initChatSocket(httpServer, corsOrigin = "*") {
//   const io = new Server(httpServer, {
//     cors: { origin: corsOrigin, methods: ["GET", "POST"] },
//   });

//   io.use((socket, next) => {
//     try {
//       const token = socket.handshake.auth?.token;
//       if (!token) return next(new Error("No auth token"));
//       const payload = jwt.verify(token, process.env.JWT_SECRET);
//       socket.UserModel = { _id: payload.id || payload._id, role: payload.role };
//       return next();
//     } catch (err) {
//       return next(new Error("Auth failed"));
//     }
//   });

//   io.on("connection", async (socket) => {
//     const userId = String(socket.UserModel._id);
//     socket.join(`user:${userId}`);

//     const convs = await Conversation.find({ participants: userId }).select("_id");
//     convs.forEach((c) => socket.join(`conv:${c._id}`));

//     socket.on("message:send", async (payload) => {
//       try {
//         const { conversationId, to, text } = payload || {};
//         if (!conversationId || !to || !text?.trim()) return;

//         const conv = await Conversation.findById(conversationId);
//         if (!conv || !conv.participants.map(String).includes(userId)) return;

//         const msg = await Message.create({
//           conversation: conversationId,
//           sender: userId,
//           receiver: to,
//           text: text.trim(),
//         });

//         conv.lastMessage = text.trim();
//         conv.lastMessageAt = new Date();
//         await conv.save();

//         const populated = await Message.findById(msg._id)
//           .populate("sender", "_id fullName avatar")
//           .populate("receiver", "_id fullName avatar");

//         io.to(`conv:${conversationId}`).emit("message:new", populated);
//         io.to(`user:${to}`).emit("message:new", populated);
//       } catch (err) {
//         console.error("message:send error:", err.message);
//       }
//     });

//     socket.on("disconnect", () => {
//     });
//   });

//   return io;
// }
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Conversation from "../database/models/Conversation.js";
import Message from "../database/models/Message.js";
import UserModel from "../database/models/UserModel.js";

export function initChatSocket(httpServer, corsOrigin = "*") {
  const io = new Server(httpServer, {
    cors: { origin: corsOrigin, methods: ["GET", "POST"] },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("No auth token"));

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      const userId = payload.id || payload._id;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return next(new Error("Invalid user ID"));
      }

      // Verify user exists
      const user = await UserModel.findById(userId).select("_id fullName role");
      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user; // ✅ Đổi từ UserModel thành user
      return next();
    } catch (err) {
      console.error("Socket auth error:", err);
      return next(new Error("Auth failed"));
    }
  });

  io.on("connection", async (socket) => {
    try {
      const userId = socket.user._id; // ✅ Không cần String()
      socket.join(`user:${userId}`);

      console.log(`🔌 User ${userId} connected (${socket.user.fullName})`);

      // ✅ Find conversations với ObjectId, không phải string
      const convs = await Conversation.find({
        participants: userId  // userId đã là ObjectId
      }).select("_id");

      convs.forEach((c) => socket.join(`conv:${c._id}`));
      console.log(`📋 User joined ${convs.length} conversations`);

      socket.on("message:send", async (payload) => {
        try {
          const { conversationId, to, text } = payload || {};

          if (!conversationId || !to || !text?.trim()) {
            console.log("❌ Invalid message payload:", payload);
            return;
          }

          // ✅ Validate ObjectIds
          if (!mongoose.Types.ObjectId.isValid(conversationId) ||
            !mongoose.Types.ObjectId.isValid(to)) {
            console.log("❌ Invalid ObjectId in payload");
            return;
          }

          const conv = await Conversation.findById(conversationId);
          if (!conv) {
            console.log("❌ Conversation not found:", conversationId);
            return;
          }

          // ✅ Check participants properly
          const participantIds = conv.participants.map(p => p.toString());
          if (!participantIds.includes(userId.toString())) {
            console.log("❌ User not in conversation");
            return;
          }

          const msg = await Message.create({
            conversation: conversationId,
            sender: userId,  // userId đã là ObjectId
            receiver: to,    // to phải là ObjectId hợp lệ
            text: text.trim(),
          });

          conv.lastMessage = text.trim();
          conv.lastMessageAt = new Date();
          await conv.save();

          const populated = await Message.findById(msg._id)
            .populate("sender", "_id fullName avatar role")
            .populate("receiver", "_id fullName avatar role");

          io.to(`conv:${conversationId}`).emit("message:new", populated);
          io.to(`user:${to}`).emit("message:new", populated);

          console.log(`✅ Message sent in conversation ${conversationId}`);
        } catch (err) {
          console.error("❌ message:send error:", err.message);
        }
      });

      socket.on("disconnect", () => {
        console.log(`🔌 User ${userId} disconnected`);
      });

    } catch (err) {
      console.error("❌ Connection error:", err);
      socket.disconnect();
    }
  });

  return io;
}