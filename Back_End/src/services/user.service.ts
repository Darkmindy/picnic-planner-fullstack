import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const findByEmail = async (email: String): Promise<IUser | null> => {
	return await User.findOne({ email });
};

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create({ user });
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
