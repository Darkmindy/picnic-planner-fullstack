import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";
import { createAccessToken } from "../utility/commonAuthFunctions";

export const logIn = async (req: Request, res: Response) => {
	try {
		// Get user by email
		const { email, password, ...userData } = req.body as IUser;
		const userByEmail = await findByEmail(req.body.email);

		// Check if user exists
		if (!userByEmail) {
			return res.status(404).json("Invalid email or password");
		}

		// compare password
		const validPassword = await bcrypt.compare(
			req.body.password,
			userByEmail.password.toString()
		);

		// Check if password matches and exist in db
		if (!validPassword) {
			return res.status(401).json("Invalid email or password");
		}

		//? this logic of statusUpdated is done if we want to see the json updated in the response but don't really need it
		//let statusUpdated: IUser | null = null;
		// Exclude password from response
		// const loggedUser = {
		// 	username: userByEmail.username,
		// 	email: userByEmail.email,
		// 	isOnline: statusUpdated?.isOnline,
		// };

		const id = userByEmail._id?.toString();

		// Check and Update user's online status + access token
		if (userByEmail.isOnline === false && id) {
			const accessToken = createAccessToken(id);
			updateUserStatusHandler(id, true);

			return res.status(200).json({
				message: "You are logged in!",
				accessToken: accessToken,
			});
		} else if (userByEmail.isOnline === true && userByEmail._id) {
			return res.status(404).json("User already logged in"); //! check if this status code are properly defined
		} else {
			return res.status(404).json("User not found"); //! check if this status code are properly defined
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
