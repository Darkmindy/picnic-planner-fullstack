import { RefreshToken } from "../models/refreshToken.model";
import { IRefreshToken } from "../validation/refreshToken.interface";

export const createRefreshToken = async (
	token: string,
	user: string
): Promise<IRefreshToken | null> => {
	return await RefreshToken.create({ token, user });
};

// delete the user's refreshToken from the database //! to implement there are soome errors!
export const removeItemFromUserRefreshTokens = async (
	userId: string
): Promise<IRefreshToken | null> => {
	return await RefreshToken.findOneAndDelete({ user: userId });
};

// find the user's refreshToken from the database
export const findRefreshToken = async (
	token: string
): Promise<IRefreshToken | null> => {
	return await RefreshToken.findOne({ token });
};

// find the user's refreshToken and update it

export const updateRefreshToken = async (
	token: string,
	newToken: string
): Promise<IRefreshToken | null> => {
	return await RefreshToken.findOneAndUpdate(
		{ token },
		{ $set: { token: newToken } },
		{ new: true }
	);
};
