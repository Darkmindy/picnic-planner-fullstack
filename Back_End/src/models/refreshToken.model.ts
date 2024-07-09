import mongoose from "mongoose";
import { env } from "../utility/env";
import { IRefreshToken } from "../validation/refreshToken.validation";

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>(
	{
		token: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

// delete __v property from client side
refreshTokenSchema.set("toObject", {
	transform: (ret) => {
		ret.id = ret._id.toString(); // Convert ObjectId to string for convenience
		delete ret.__v; // Remove __v property
		return ret;
	},
});

// Virtual property approach (to check if the token has expired and allow to acces at this property in other files)
// refreshTokenSchema.virtual("isExpired", {
// 	get() {
// 		const refreshTokenExpirationInMs =
// 			parseInt(env.REFRESH_TOKEN_EXPIRATION_TIME, 10) *
// 			24 *
// 			60 *
// 			60 *
// 			1000;
// 		return (
// 			this.timestamps.updatedAt.getTime() + refreshTokenExpirationInMs <
// 			Date.now()
// 		);
// 	},
// });

export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
