import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { removeItemFromUserRefreshTokens } from "../services/refreshToken.service";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";
import { IUser } from "../validation/user.interface";

export const expiredSessionHandler = async (
	req: ExtendedRequest,
	res: Response
) => {
	try {
		// get user by email
		const { email } = req.body as IUser;
		const user = await findByEmail(email);
		// check if user exists
		if (!user) {
			return res.status(404).json("User not found");
		}
		// get user id
		const id = user._id?.toString();
		// check if user's id is undefined
		if (!id) {
			return res.status(404).json("User not found");
		}
		// check if user's status isOnline === false
		if (user.isOnline === false) {
			return res
				.status(400)
				.json("User is already logged out or his session is expired");
		}
		//? check if user's access token is expired
		// update the userStatusHandler with isOnline === false
		await updateUserStatusHandler(id, false);
		// remove the refreshToken from the database
		await removeItemFromUserRefreshTokens(id);

		return res.status(401).json("Session expired, you need to login again");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
