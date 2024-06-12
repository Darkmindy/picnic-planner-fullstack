import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { findByEmail, updateUserStatusHandler } from "../services/user.service";

export const logIn = async (req: Request, res: Response) => {
	try {
		// Get user by email
		const { email, password, ...userData } = req.body as IUser;
		const userByEmail = await findByEmail(req.body.email);
		if (!userByEmail) {
			return res.status(400).json("User not found");
		}
		const comparePassword = bcrypt.compare(
			req.body.password,
			userByEmail.password.toString()
		);

		// Check if user exists and password matches
		if (!userByEmail || !comparePassword) {
			return res.status(401).json("Invalid email or password");
		}

		// Update user's online status
		if (userByEmail._id) {
			await updateUserStatusHandler(userByEmail._id, true);
		}
		// Exclude password from response
		const responseUser = {
			username: userByEmail.username,
			email: userByEmail.email,
			isOnline: userByEmail.isOnline,
		};

		res.status(200).json(responseUser);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
