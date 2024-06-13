import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create(user);
};

export const findByEmail = async (
	email: string | undefined
): Promise<IUser | null> => {
	try {
		if (!email) {
			throw new Error("Email is undefined");
		}
		return await User.findOne({ email: email });
	} catch (err) {
		console.error("Error finding user by email:", err);
		return null;
	}
};

export const updateUserStatusHandler = async (
	userId: String,
	status: Boolean
): Promise<IUser | null> => {
	return await User.findOneAndUpdate(
		{ _id: userId },
		{ $set: { isOnline: status } },
		{ new: true }
	);
};
