import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export const findByKey = async (key: string): Promise<IUser | null> => {
	return await User.findOne({ key });
};

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create({ user });
};
