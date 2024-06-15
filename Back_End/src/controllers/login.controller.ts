import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../validation/user.interface";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";
import { createAccessToken } from "../utility/commonAuthFunctions";

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
			const accessToken = createAccessToken(id);
			await updateUserStatusHandler(id, true);

			res.cookie("access_token", accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				maxAge: 48 * 60 * 60 * 1000, // 2 days
			})
		} else if (userByEmail.isOnline === true && id) {
			return res.status(400).json("User already logged in");
		} else {
			return res.status(404).json("User not found");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};
