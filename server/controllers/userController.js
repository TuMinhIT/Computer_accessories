import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";

export const createDefaultAdmin = async () => {
  const admin = await User.findOne({ username: "admin" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      username: "admin",
      email: "admin@gmail.com",
      fullName: "Administrator",
      password: hashedPassword,
      role: "admin",
      isActive: true,
      firstLogin: false,
    });
    console.log("Default admin created: admin/admin");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.send({
        success: false,
        message: "User not found",
      });

    if (user.isLocked)
      return res.send({
        success: false,
        message: "Account locked",
      });

    if (!user.isActive)
      return res.send({
        success: false,
        message: "Please contact admin to activate your account!",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.send({
        success: false,
        message: "Invalid password",
      });

    if (user.firstLogin && user.role === "staff") {
      return res.send({
        success: false,
        message: "Please change password before accessing system",
      });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.send({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};









export const logout = async (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
