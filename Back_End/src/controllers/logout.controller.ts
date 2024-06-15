import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import {
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id;

		if (id) {
			const loggedIn = await findUserById(id);

			if (loggedIn?.isOnline === false) {
				return res.status(400).json("User already logged out");
			}

			res.clearCookie('accessToken', {
				httpOnly: true,
				secure: process.env.PROD_DBNAME === 'db_prod', // true for production
				sameSite: 'strict',
			});

			await updateUserStatusHandler(id, false);
			return res.status(200).json("Successfully logged out");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
