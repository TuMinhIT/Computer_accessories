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

    if (decode.role === admin.role) {
      next();
    } else {
      return res.send({
        success: false,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default adminAuth;
