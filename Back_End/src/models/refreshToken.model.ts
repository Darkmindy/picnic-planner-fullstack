import mongoose from "mongoose";
import { IRefreshToken } from "../validation/refreshToken.interface";

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>({
  token: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // it's important to manage both this expire period and the period set during token creation
  },
});

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
