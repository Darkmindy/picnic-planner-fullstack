import mongoose from "mongoose";
import { hashStuff } from "../utility/commonAuthFunctions";
import { IUser, Roles } from "../validation/user.validation";
import { eventSchema } from "./event.model";

// Create the User schema
export const userSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			enum: Roles,
			default: "user",
		},
		isOnline: {
			type: Boolean,
		},
		events: [
			{
				type: eventSchema,
				ref: "Event",
			},
		],
		friends: [
			{
				type: String, // perhaps is best to use: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: { virtuals: true },
	}
);

// delete __v property from client side
userSchema.set("toObject", {
	transform: (ret) => {
		ret.id = ret._id.toString(); // Convert ObjectId to string for convenience
		delete ret.__v; // Remove __v property
		return ret;
	},
});

// pre save hook
userSchema.pre("save", async function (next) {
	const user = this; // Use 'this' to access the document being saved

	try {
		// Hash the password before saving the user model
		user.password = await hashStuff(user.password.toString());
		next();
	} catch (error) {
		next(); // Pass on errors to error handling middleware
	}
});

// Create the User model
export const User = mongoose.model("User", userSchema);
