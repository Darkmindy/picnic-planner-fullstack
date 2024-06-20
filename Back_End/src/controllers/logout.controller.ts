import { Response } from "express";
import { ObjectId } from "mongoose";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { RefreshToken } from "../models/refreshToken.model";
import {
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";
import { IRefreshToken } from "../validation/refreshToken.interface";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id as string | ObjectId;

		if (id) {
			const loggedIn = await findUserById(id as string);

			// check if user is already offline
			if (loggedIn?.isOnline === false) {
				return res.status(400).json("User already logged out");
			}

			await updateUserStatusHandler(id as string, false);
			(await RefreshToken.findOneAndDelete({
				user: id as ObjectId,
			})) as IRefreshToken;

			return res.status(200).json("Successfully logged out");
		}
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
