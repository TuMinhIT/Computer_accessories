import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const initChatSocket = (httpServer, corsOpts = { origin: "*" }) => {
  const io = new Server(httpServer, { cors: corsOpts });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(" ")[1];
      if (!token) return next(new Error("Unauthorized"));
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { _id: payload.id, role: payload.role };
      next();
    } catch (e) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.user._id.toString();

    socket.join(`user:${userId}`);

    socket.on("message:send", async ({ conversationId, to, text }) => {
      if (!text?.trim()) return;
      try {
        const msg = await Message.create({
          conversation: conversationId,
          sender: userId,
          receiver: to,
          text,
        });

        await Conversation.findByIdAndUpdate(conversationId, {
          $set: { lastMessage: { text, at: msg.createdAt, sender: userId } },
        });

        const payload = await msg.populate([
          { path: "sender", select: "fullName avatar" },
          { path: "receiver", select: "fullName avatar" },
        ]);

        io.to(`user:${to}`).emit("message:new", payload);
        io.to(`user:${userId}`).emit("message:new", payload);
      } catch (e) {
        socket.emit("message:error", { message: e.message });
      }
    });

    socket.on("conversation:markRead", async ({ conversationId }) => {
      try {
        const result = await Message.updateMany(
          { conversation: conversationId, receiver: userId, readAt: null },
          { $set: { readAt: new Date() } }
        );
        io.to(`user:${userId}`).emit("message:read", { conversationId });
        const messages = await Message.find({ conversation: conversationId }).limit(1);
        const anyMsg = messages[0];
        if (anyMsg) {
          const other = [anyMsg.sender.toString(), anyMsg.receiver.toString()].find((x) => x !== userId);
          if (other) io.to(`user:${other}`).emit("message:read", { conversationId });
        }
      } catch (e) {
        socket.emit("message:error", { message: e.message });
      }
    });

    socket.on("disconnect", () => {});
  });

  return io;
};
export default initChatSocket;