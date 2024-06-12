import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

// Create the User schema
const userSchema = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: false },
		surname: { type: String, required: false },
		username: { type: String, required: false, unique: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		age: { type: Number, required: false },
		isOnline: { type: Boolean, default: false, required: false },
	},
	{ timestamps: true }
);

// Create the User model
export const User = mongoose.model("User", userSchema);
