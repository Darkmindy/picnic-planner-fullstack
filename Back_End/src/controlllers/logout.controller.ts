import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const id = req.user?._id;
		if (id) {
			const loggedIn = await findByEmail(id);
			if (loggedIn?.isOnline === false) {
				//! if (loggedIn!.isOnline! === false) i get "Internal server errorTypeError: Cannot read properties of null (reading 'isOnline')"
				return res.status(400).json("User already logged out");
			}
			await updateUserStatusHandler(id, false);
		}
		return res.status(200).json("Successfully logged out");
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
