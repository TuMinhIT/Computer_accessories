import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        user: { type: String, required: true },
        token: { type: String, required: true },
        type: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.TokenModel || mongoose.model("TokenModel", tokenSchema);
