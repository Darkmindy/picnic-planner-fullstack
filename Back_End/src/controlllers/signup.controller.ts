import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { createUser, findByEmail } from "../services/user.service";

export const signUp = async (req: Request, res: Response) => {
	try {
		const { email, password, ...userData } = req.body as IUser;
		const userByEmail = await findByEmail(req.body.email);

		if (userByEmail) {
			return res.status(400).json({ message: "User already exists" });
		}

		//! Hash password --> consideriamo l'ipotesi hashare prima di salvare sul database (poi vi spiego come funziona)
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = bcrypt.hash(req.body.password, salt);

		console.log({ userData: userData });

		//! si ferma qui, la variabile newUser non viene assegnata
		const newUser = await createUser({
			...userData,
			password: hashedPassword.toString(),
			email,
		});
		console.log({ newUser: newUser });

		res.status(200).json(newUser);
	} catch (error: any) {
		//! questo if serve a capire di che tipo di ValidationError si tratta nel punto in cui si blocca il codice
		if (error.name === "ValidationError") {
			return res.status(400).json({ message: "Missing required fields" });
		}

		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};
