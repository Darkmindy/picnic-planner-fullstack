import { Response } from "express";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { findUserById } from "../services/user.service";
import { IFormattedUser } from "../validation/user.validation";

export const fetchUser = async (req: ExtendedRequest, res: Response) => {
	try {
		const userId = req.user?._id;

		if (!userId) {
			return res.status(404).json("User not found");
		}

		const user = await findUserById(userId);
		if (!user) {
			return res.status(404).json("User not found");
		}

		// format user name for client side
		const nameFormatted: IFormattedUser = {
			name: user.name as string,
			email: user.email as string,
			password: user.password as string,
			role: user.role as string,
			isOnline: user.isOnline as boolean,
		};

		return res.status(200).json(nameFormatted.name);
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
