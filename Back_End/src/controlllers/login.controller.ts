import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { findByKey } from "../services/user.service";

export const logIn = async (req: Request, res: Response) => {
	const user: IUser = req.body as { email: string; password: string };
	const userByEmail = await findByKey(user.email);
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	if (!userByEmail || userByEmail.password !== hashedPassword) {
		return res
			.status(404)
			.json("You've to register before trying to login");
	}

	try {
		userByEmail.isOnline = true;
		const newUser = new User({ userByEmail });
		const userSaved = await newUser.save();
		res.status(200).json(userSaved);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
