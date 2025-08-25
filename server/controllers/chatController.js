import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/UserModel.js";

const getAdminUser = async () => {
  const admin = await User.findOne({ role: "admin" }).select("_id fullName avatar email");
  if (!admin) throw new Error("No admin user found.");
  return admin;
};

const getOrCreateConv = async (employeeId, adminId) => {
  let conv = await Conversation.findOne({
    participants: { $all: [employeeId, adminId] },
  });
  if (!conv) {
    conv = await Conversation.create({ participants: [employeeId, adminId] });
  }
  return conv;
};

export const getMyConversationWithAdmin = async (req, res) => {
  try {
    const me = req.user._id;
    const admin = await getAdminUser();
    const conv = await getOrCreateConv(me, admin._id);
    res.json({ success: true, data: { conversationId: conv._id, admin } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const msgs = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 })
      .populate("sender", "fullName avatar")
      .populate("receiver", "fullName avatar");
    res.json({ success: true, data: msgs });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const markRead = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const result = await Message.updateMany(
      { conversation: conversationId, receiver: req.user._id, readAt: null },
      { $set: { readAt: new Date() } }
    );
    res.json({ success: true, data: { modified: result.modifiedCount } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const adminUnreadByEmployee = async (req, res) => {
  try {
    const admin = req.user._id;
    const agg = await Message.aggregate([
      { $match: { receiver: admin, readAt: null } },
      {
        $group: {
          _id: "$sender",
          unread: { $sum: 1 },
          lastAt: { $max: "$createdAt" },
        },
      },
      { $sort: { lastAt: -1 } },
    ]);
    const withUser = await Promise.all(
      agg.map(async (a) => {
        const u = await User.findById(a._id).select("_id fullName avatar email");
        return { user: u, unread: a.unread, lastAt: a.lastAt };
      })
    );
    res.json({ success: true, data: withUser });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
