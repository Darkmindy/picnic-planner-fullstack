import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

// Create the User schema
const userSchema = new mongoose.Schema<IUser>({
	name: {
		type: String,
		//default: "",
		required: true,
	},
	surname: {
		type: String,
		//default: "",
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true, // Add unique constraint for username
	},
	email: {
		type: String,
		required: true,
		unique: true, // Add unique constraint for email
	},
	password: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	isOnline: {
		type: Boolean,
		default: false, // Set default value to false
	},
});
// Create the User model
export const User = mongoose.model("User", userSchema);
