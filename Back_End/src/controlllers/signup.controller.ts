import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { createUser, findByKey } from "../services/user.service";

export const signUp = async (req: Request, res: Response) => {
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	const user: IUser = { ...req.body, password: hashedPassword };
	const userEmail = await findByKey(user.email);
	if (userEmail) {
		return res.status(400).json({ message: "User already registered" });
	}
	try {
		const newUser = await createUser(user);
		res.status(201).json(newUser);
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
};
