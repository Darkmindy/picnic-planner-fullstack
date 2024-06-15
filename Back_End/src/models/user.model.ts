import mongoose from "mongoose";
import { hashStuff } from "../utility/commonAuthFunctions";
import { IUser, Roles } from "../validation/user.interface";

// Create the User schema
const userSchema = new mongoose.Schema<IUser>({
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
		default: false, // Set default value to false
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
