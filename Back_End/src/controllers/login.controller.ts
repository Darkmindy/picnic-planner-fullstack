import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createRefreshToken } from "../services/refreshToken.service";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";
import {
	calculateAccessTokenExpiresAt,
	createToken,
} from "../utility/commonAuthFunctions";
import { IUser } from "../validation/user.interface";

export const logIn = async (req: Request, res: Response) => {
	try {
		// Get user by email
		const { email, password } = req.body as IUser;
		const userByEmail = await findByEmail(email);

		// Check if user exists
		if (!userByEmail) {
			return res.status(404).json("Invalid email or password");
		}

		// compare password
		const validPassword = await bcrypt.compare(
			password,
			userByEmail.password.toString()
		);

		// Check if password matches and exist in db
		if (!validPassword) {
			return res.status(401).json("Invalid email or password");
		}

		const id = userByEmail._id?.toString();

		// Check and Update user's online status + access token
		if (userByEmail.isOnline === false && id) {
			const token = createToken(id);

			// calculate exact expiration time for access token
			const accessTokenExp = calculateAccessTokenExpiresAt();

			await updateUserStatusHandler(id, true);

			await createRefreshToken(token.refreshToken, id);

			return res
				.status(200)
				.header("Authorization", `Bearer ${token.accessToken}`)
				.json({
					message: `The user with ${id} as id is logged in successfully!`,
					accessTokenExp: accessTokenExp,
					refreshToken: token.refreshToken,
				});
		} else if (userByEmail.isOnline === true && id) {
			return res.status(400).json("User already logged in");
		} else {
			return res.status(404).json("User not found");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
