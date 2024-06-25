import { Response } from "express";
import { fromZodError, ValidationError } from "zod-validation-error";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { removeItemFromUserRefreshTokens } from "../services/refreshToken.service";
import {
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";
import { ZLogOutSchema } from "../validation/user.interface";

export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const validationError = ZLogOutSchema.safeParse(req.params);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}
		// get user id
		const userId = req.user?._id || validationError?.data?.id;
		if (!userId) {
			return res.status(400).json("Missing user id");
		}

		const loggedIn = await findUserById(userId);

		// check if user is already offline
		if (loggedIn?.isOnline === false) {
			return res.status(400).json("User already logged out");
		}

		await updateUserStatusHandler(userId, false);
		await removeItemFromUserRefreshTokens(userId);

		return res.status(200).json("User successfully logged out");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

//? possible implementation: https://g.co/gemini/share/e8055bb5e6af
