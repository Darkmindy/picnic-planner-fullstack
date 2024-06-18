import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { RefreshToken } from "../models/refreshToken.model";
import {
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";
import { IRefreshToken } from "../validation/refreshToken.interface";
import { ObjectId } from "mongoose";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id as string | ObjectId;

		if (id) {
			const loggedIn = await findUserById(id as string);

			if (loggedIn?.isOnline === false) {
				return res.status(400).json("User already logged out");
			}

			await updateUserStatusHandler(id as string, false);
			(await RefreshToken.findOneAndDelete({
				user: id,
			})) as IRefreshToken;

			//! need to delete the user's refresh token from the database

			return res.status(200).json("Successfully logged out");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
