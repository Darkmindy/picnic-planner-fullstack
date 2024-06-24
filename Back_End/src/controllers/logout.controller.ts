import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { removeItemFromUserRefreshTokens } from "../services/refreshToken.service";
import {
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id as string;

		if (id) {
			const loggedIn = await findUserById(id as string);

			// check if user is already offline
			if (loggedIn?.isOnline === false) {
				return res.status(400).json("User already logged out");
			}

			await updateUserStatusHandler(id as string, false);
			await removeItemFromUserRefreshTokens(id);

			return res.status(200).json("Successfully logged out");
		}
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
