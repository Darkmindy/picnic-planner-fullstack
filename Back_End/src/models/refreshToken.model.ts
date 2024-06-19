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
	},
});

// pre save hook
// refreshTokenSchema.pre("save", async function (next) {
// 	const refreshToken = this; // Use 'this' to access the document being saved
// 	const expires =
// 		typeof env.REFRESH_TOKEN_EXPIRATION_DAYS === "string"
// 			? parseInt(env.REFRESH_TOKEN_EXPIRATION_DAYS)
// 			: env.REFRESH_TOKEN_EXPIRATION_DAYS;
// });

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
