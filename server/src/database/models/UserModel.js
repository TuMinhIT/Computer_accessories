import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: "" },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "staff"], default: "staff" },
    phone: { type: String },
    isActive: { type: Boolean, default: false },
    address: { type: String, default: "" },
    birthday: { type: Date },
    gender: { type: String, enum: ["male", "female", "other", ""], default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
