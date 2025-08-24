import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ success: false, message: "Token expired" });
        }
        return res.status(403).json({ success: false, message: "Invalid token" });
      }

      const admin = await User.findOne({ role: "admin" });
      if (!admin || decoded.role !== "admin") {
        return res.status(403).json({ success: false, message: "Unauthorized" });
      }

      req.admin = admin; 
      next();
    });
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default adminAuth;
