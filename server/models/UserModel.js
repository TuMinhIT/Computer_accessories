import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    phone: { type: String },
    salary: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
    mustChangePassword: { type: Boolean, default: true },
    locked: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },

    address: { type: String, default: "" },
    bio: { type: String, maxlength: 500, default: "" },
    birthday: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
