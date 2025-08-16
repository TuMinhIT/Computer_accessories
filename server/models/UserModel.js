import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    isLocked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    firstLogin: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
