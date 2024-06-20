import mongoose from "mongoose";
import { env } from "../utility/env";
import { IRefreshToken } from "../validation/refreshToken.interface";

const refreshTokenExpirationInMs =
	parseInt(env.REFRESH_TOKEN_EXPIRATION_TIME, 10) * 24 * 60 * 60 * 1000; // Convert days to milliseconds

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
	expiresAt: {
		type: Date,
	},
});

// pre save hook
refreshTokenSchema.pre("save", async function (next) {
	// Only calculate expiration if the document is newly created (not updated)
	if (!this.isNew) {
		return next();
	}

	// Update expiresAt based on current time and expiration days
	this.expiresAt = new Date(Date.now() + refreshTokenExpirationInMs);

	next();
});

// Virtual property to check if the token has expired //!to implement
refreshTokenSchema.virtual("isExpired", {
	get() {
		return this.expiresAt < Date.now();
	},
});

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
