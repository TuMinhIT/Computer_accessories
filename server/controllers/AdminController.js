import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createDefaultAdmin = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    const hashedPassword = await bcrypt.hash("admin", 10);
    await User.create({
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      fullName: "Administrator",
      password: hashedPassword,
      role: "admin",
      salary: 1000000,
      mustChangePassword: false,
    });
    console.log("Default admin created: admin/admin");
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.send({
        success: false,
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.send({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    res.send({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminProfile = async (req, res) => {
  try {
    const admin = req.admin;
    res.send({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  loginAdmin,
  createDefaultAdmin,
  adminProfile,
};
