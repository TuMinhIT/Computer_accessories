import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/UserModel.js";

export const getMyConversation = async (req, res) => {
  try {
    const me = req.user;
    if (!me || !me._id) {
      return res.status(401).json({ success: false, message: "Unauthorized: no user id" });
    }

    const admin = await User.findOne({ role: "admin" }).select("_id fullName avatar email");
    if (!admin || !admin._id) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    let conv = await Conversation.findOne({
      participants: { $all: [me._id, admin._id] },
    });

    if (!conv) {
      conv = await Conversation.create({
        participants: [me._id, admin._id],
      });
    }

    return res.json({
      success: true,
      data: { conversationId: conv._id, admin },
    });
  } catch (err) {
    console.error("getMyConversation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId })
      .sort({ createdAt: 1 })
      .populate("sender", "_id fullName avatar")
      .populate("receiver", "_id fullName avatar");

    return res.json({ success: true, data: messages });
  } catch (err) {
    console.error("getMessages error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const markConversationSeen = (io) => async (req, res) => {
  try {
    const adminId = req.user._id;
    const { conversationId } = req.body;

    await Message.updateMany(
      { conversation: conversationId, receiver: adminId, readAt: null },
      { $set: { readAt: new Date() } }
    );

    io.to(`conv:${conversationId}`).emit("message:read", { conversationId });

    return res.json({ success: true });
  } catch (err) {
    console.error("markConversationSeen error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// export const getAllConversations = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     }

//     const convs = await Conversation.find({})
//       .sort({ lastMessageAt: -1 })
//       .populate("participants", "_id fullName email avatar role");

//     const data = convs.map((c) => {
//       const employee = (c.participants || []).find((p) => p.role !== "admin");

//       return {
//         conversationId: c._id,
//         employee: employee || null,
//         lastMessage: c.lastMessage || "",
//         lastMessageAt: c.lastMessageAt || null,
//       };
//     });

//     res.json({ success: true, data });
//   } catch (err) {
//     console.error("❌ getAllConversations error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
export const getAllConversations = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    console.log("🔍 Admin getting all conversations:", req.user._id);

    // ✅ Thêm filter để tránh participants invalid
    const convs = await Conversation.find({
      participants: { 
        $exists: true, 
        $not: { $size: 0 },
        $type: "array"
      }
    })
    .sort({ lastMessageAt: -1 })
    .populate({
      path: "participants", 
      select: "_id fullName email avatar role",
      // ✅ Chỉ populate những document tồn tại
      options: { strictPopulate: false }
    })
    .lean(); // ✅ Thêm lean() để performance tốt hơn

    console.log(`✅ Found ${convs.length} conversations`);

    // ✅ Filter và map cẩn thận hơn
    const data = convs
      .filter(c => {
        // Loại bỏ conversation không có participants hợp lệ
        if (!c.participants || !Array.isArray(c.participants) || c.participants.length === 0) {
          console.log("⚠️ Invalid conversation found:", c._id);
          return false;
        }
        return true;
      })
      .map((c) => {
        // Tìm employee (không phải admin)
        const employee = c.participants.find((p) => {
          return p && p.role && p.role !== "admin";
        });

        return {
          conversationId: c._id,
          employee: employee ? {
            _id: employee._id,
            fullName: employee.fullName,
            email: employee.email,
            avatar: employee.avatar
          } : null,
          lastMessage: c.lastMessage || "",
          lastMessageAt: c.lastMessageAt || c.createdAt,
        };
      })
      .filter(item => item.employee !== null); // Chỉ trả về conversations có employee

    console.log(`✅ Returning ${data.length} valid conversations`);
    res.json({ success: true, data });

  } catch (err) {
    console.error("❌ getAllConversations error:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({ success: false, message: err.message });
  }
};