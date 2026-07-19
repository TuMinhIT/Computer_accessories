import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import bcrypt from "bcrypt";

const userService = {
  createUser: async (name, email, password) => {
    const existing = await User.findOne({ email });
    const role = "user";
    if (existing) {
      // Kiểm tra nếu user đã tồn tại nhưng chỉ đăng nhập qua Google (không có password)
      if (!existing.password && existing.googleId) {
        // Cập nhật password cho tài khoản Google hiện có
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await User.findByIdAndUpdate(
          existing._id,
          {
            password: hashedPassword,
            name: name || existing.name, // Cập nhật tên nếu có
          },
          { new: true },
        );

        return {
          user: updatedUser,
          message: "Tài khoản Google đã được liên kết với mật khẩu thành công",
        };
      }

      // Nếu user đã có password (đã đăng ký bằng email/password trước đó)
      if (existing.password) {
        throw new ApiError(
          400,
          "Email đã được đăng ký bằng mật khẩu",
          "Bad Request",
        );
      }

      throw new ApiError(400, "Email đã tồn tại trong hệ thống", "Bad Request");
    }

    // Tạo user mới nếu email chưa tồn tại
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return {
      user,
      message: "Tài khoản đã được tạo thành công",
    };
  },

  getUserById: async (id) => {
    return await User.findById(id).select("-password");
  },

  getAdmin: async () => {
    return await User.findOne({
      role: "admin",
    });
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  updatePassword: async (id, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await User.findByIdAndUpdate(id, { password: hashedPassword });
  },

  getAllUsers: async () => {
    return await User.find({ role: { $ne: "admin" } });
  },

  blockUser: async (id) => {
    const existing = await User.findById(id);

    if (!existing) {
      throw new ApiError(404, "User không tồn tại!", "Bad Request");
    }

    existing.is_active = !existing.is_active;
    await existing.save();

    return { message: "Block thành công" };
  },

  updateInfoUser: async (id, data) => {
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new ApiError(404, "User không tồn tại!", "Bad Request");
    }

    const updateData = {};

    if (data.name && data.name !== user.name) {
      updateData.name = data.name;
    }

    if (data.dob && data.dob !== user.dob) {
      updateData.dob = data.dob;
    }

    if (data.gender && data.gender !== user.gender) {
      updateData.gender = data.gender;
    }
    if (data.phone && data.phone !== user.phone) {
      updateData.phone = data.phone;
    }

    if (data.role && data.role !== user.role) {
      updateData.role = data.role;
    }
    if (data.avatar && data.avatar !== user.avatar && data.avatar != "") {
      updateData.avatar = data.avatar;
    }
    // updateData.avatar = user.avatar;

    if (Object.keys(updateData).length === 0) {
      return user;
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  },
};

export default userService;
