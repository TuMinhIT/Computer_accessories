import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import User from "../src/models/UserModel.js";
import { cloudinary } from "../config/cloudinary.js";



const changeUserPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) return res.json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.mustChangePassword = false;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully. You can now login.",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, salary } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { fullName, phone, salary },
      { new: true }
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleBlockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    user.locked = !user.locked;
    await user.save();

    res.json({
      success: true,
      message: user.locked ? "User blocked" : "User unblocked",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "Email not found" });

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail(user.email, "Password Reset Request", OTP, "forgot");

    const otpToken = jwt.sign(
      {
        otp: OTP,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1m",
      }
    );

    res.json({
      success: true,
      message: "OTP đã được gửi tới email",
      data: otpToken,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, otpToken, otp } = req.body;

    const decode = jwt.verify(otpToken, process.env.JWT_SECRET);
    console.log(decode);
    const user = await User.findOne({
      email: decode.email,
    });
    console.log(user);

    if (!user) return res.json({ success: false, message: "user not found" });

    if (decode.otp === otp) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      res.json({
        success: true,
        data: user,
      });
    } else {
      res.json({ success: false, message: "OTP not match!" });
    }
  } catch (err) {
    console.log(err.message);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select("-password -resetPasswordToken -resetPasswordExpire");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("getProfile error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    let updates = { ...req.body };

    if (req.file) {
      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars",
        public_id: `user_${req.user.username}`,
        overwrite: true,
      });
      updates.avatar = uploadRes.secure_url;
    }

    if (updates.birthday) {
      updates.birthday = new Date(updates.birthday);
    }

    const updated = await User.findOneAndUpdate(
      { username: req.user.username },
      updates,
      { new: true }
    ).select("-password -resetPasswordToken -resetPasswordExpire");

    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "Profile updated successfully", data: updated });
  } catch (err) {
    console.error("❌ updateProfile error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export default {
  addUser,
  activateUser,
  resendActivation,
  getUsers,
  loginUser,
  changeUserPassword,
  updateUser,
  toggleBlockUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
};


