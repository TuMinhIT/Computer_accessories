import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const auth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.send({
        success: false,
        message: "Unauthorized",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decode.username });
    if (user) {
      req.user = user;
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
export default auth;
