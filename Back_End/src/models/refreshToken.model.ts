import mongoose from "mongoose";
import { env } from "../utility/env";
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

// Virtual property approach (to check if the token has expired and allow to acces at this property in other files)
refreshTokenSchema.virtual("isExpired", {
	get() {
		const refreshTokenExpirationInMs =
			parseInt(env.REFRESH_TOKEN_EXPIRATION_TIME, 10) *
			24 *
			60 *
			60 *
			1000;
		return (
			this.createdAt.getTime() + refreshTokenExpirationInMs < Date.now()
		);
	},
});

// pre save hook approach
// refreshTokenSchema.pre("save", async function (next) {
// 	// Only calculate expiration if the document is newly created (not updated)
// 	if (!this.isNew) {
// 		return next();
// 	}
// 	const refreshTokenExpirationInMs =
// 	parseInt(env.REFRESH_TOKEN_EXPIRATION_TIME, 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds
// 	// Update expiresAt based on current time and expiration days
// 	this.expiresAt = new Date(Date.now() + refreshTokenExpirationInMs);

// 	next();
// });

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
