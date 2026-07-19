import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import User from "../src/models/UserModel.js";
import { cloudinary } from "../config/cloudinary.js";
const addUser = async (req, res) => {
  try {
    const { name, email, phone, salary } = req.body;

    const defaultPassword = email.split("@")[0];
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const existedUser = await User.findOne({ email: email });
    if (existedUser)
      return res.send({
        success: false,
        message: "User already existed!",
      });

    const user = await User.create({
      username: defaultPassword,
      fullName: name,
      email,
      phone,
      salary,
      password: hashedPassword,
      isActive: false,
      mustChangePassword: true,
    });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    const link = `http://localhost:5000/api/users/activate/${token}`;
    await sendEmail(email, "User Account Activation", link, "activation");

    res.json({
      success: true,
      message: "User added & email sent",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const activateUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.send("<h1>❌ User not found</h1>");
    }

    user.isActive = true;
    await user.save();

    return res.send(`
          <html><body style="text-align:center;margin-top:100px;">
            <h1 style="color:green;">✅ User activated successfully</h1>
            <p>You can now login to the system.</p>
          </body></html>
        `);
  } catch (error) {
    console.log(error.message);
    return res.send(`
  <html>
    <head>
      <title>Token Expired</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin-top: 100px;
        }
        h1 {
          color: red;
        }
        p {
          font-size: 16px;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>❌ Invalid or Expired Token</h1>
      <p>Request time has expired. Please contact Admin for support..</p>
    </body>
  </html>
`);
  }
};

const resendActivation = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const user = await User.findOne({ email });

    if (!user)
      return res.send({
        success: false,
        message: "User not found",
      });
    if (user.isActive)
      return res.send({
        success: false,
        message: "Account already activated",
      });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2m",
    });
    const link = `http://localhost:5000/api/users/activate/${token}`;
    await sendEmail(
      user.email,
      "Resend User Account Activation",
      link,
      "activation"
    );
    return res.send({
      success: true,
      message: "📧 New activation email sent. Please check your inbox.",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const Users = await User.find({ role: { $ne: "admin" } }).sort({
      createdAt: -1,
    });

    res.json({ success: true, data: Users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    if (!user.isActive) {
      return res.json({ success: false, message: "Account not activated" });
    }
    if (user.locked) {
      return res.json({
        success: false,
        message: "Account is blocked by admin",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      fullName: user.fullName,
    };

    if (user.mustChangePassword) {
      return res.json({
        success: true,
        token,
        forceChangePassword: true,
        user: userData,
      });
    }

    res.json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



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


