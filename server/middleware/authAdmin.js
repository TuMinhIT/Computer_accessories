import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const admin = await User.findOne({ role: "admin" });
    const { token } = req.headers;
    if (!token) {
      return res.send({
        success: false,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (decode.role === admin.role) {
        req.admin = admin;
        next();
      } else {
        return res.send({
          success: false,
          message: "Unauthorized",
        });
      }
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.send({
            success: false,
            message: "Token Expired Error",
          });
        }
        return res.status(403).json({ message: "Invalid token" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default adminAuth;
