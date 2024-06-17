import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { RefreshToken } from "../models/refreshToken.model";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";
import { createToken } from "../utility/commonAuthFunctions";
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

			await updateUserStatusHandler(id, true);

			// const newRefreshToken = new RefreshToken({
			// 	token: token.refreshToken,
			// 	user: userByEmail._id,
			// });
			await RefreshToken.create({
				token: token.refreshToken,
				user: userByEmail._id,
			});
			return res
				.status(200)
				.header("Authorization", `Bearer ${token.accessToken}`)
				.json("Login Successful");
		} else if (userByEmail.isOnline === true && id) {
			return res.status(400).json("User already logged in");
		} else {
			return res.status(404).json("User not found");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
