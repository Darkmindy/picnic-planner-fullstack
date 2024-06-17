import mongoose from "mongoose";
import { IRefreshToken } from "../validation/refreshToken.interface";

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>({
	token: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: "7d", // Token scadrà dopo 7 giorni
	},
});

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
