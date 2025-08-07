import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isLocked)
      return res.status(403).json({ message: "Account locked" });
    if (!user.isActive)
      return res
        .status(403)
        .json({ message: "Please activate your account via email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    if (user.firstLogin && user.role === "staff") {
      return res.status(403).json({
        message: "Please change password before accessing system",
        mustChangePassword: true,
        username: user.username,
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStaff = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const username = email.split("@")[0];
    const tempPassword = username;
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const staff = await User.create({
      username,
      email,
      fullName,
      password: hashedPassword,
      role: "staff",
      isActive: false,
      firstLogin: true,
    });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    const link = `http://localhost:5000/api/users/activate/${token}`;
    await sendEmail(
      email,
      "Account Activation",
      `Click this link to activate: ${link}`
    );

    res.json({ message: "Staff created, activation email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export const activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ username: decoded.username });

    if (!user) return res.status(400).json({ message: "User not found" });

    user.isActive = true;
    await user.save();
    res.json({ message: "Account activated, please login" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired link" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.firstLogin = false;
    await user.save();

    res.json({ message: "Password changed successfully" });
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
