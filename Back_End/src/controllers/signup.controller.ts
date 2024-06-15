import { Request, Response } from "express";
import { fromZodError } from "zod-validation-error";
import { createUser, findByEmail } from "../services/user.service";
import { env } from "../utility/env";
import { IUser, ZUserSchema } from "../validation/user.interface";
export const signUp = async (req: Request, res: Response) => {
	try {
		const validationError = ZUserSchema.safeParse(
			req.body as {
				name: string;
				email: string;
				password: string;
			}
		);

		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}

		const user = validationError.data as {
			name: string;
			email: string;
			password: string;
		};

		const userByEmail = await findByEmail(user.email);

		// Check if user exists
		if (userByEmail) {
			return res.status(400).json("Email already exists!");
		}

		// Create new user
		const newUser: IUser = {
			name: user.name,
			email: user.email,
			password: user.password,
			role: "user",
			isOnline: false,
		};

		const userCreated = await createUser(newUser);
		res.status(200).json({
			user: {
				_id: userCreated._id,
				name: userCreated.name,
				email: userCreated.email,
				role: userCreated.role,
				isOnline: userCreated.isOnline,
			},
		});
	} catch (error) {
		return res.status(500).json("Internal server error" + error);
	}
};

export const adminSignUp = async (req: Request, res: Response) => {
	try {
		const validationError = ZUserSchema.safeParse(
			req.body as {
				name: string;
				email: string;
				password: string;
			}
		);

		if (validationError.success === false) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}

		const user = validationError.data as {
			name: string;
			email: string;
			password: string;
		};

		const userByEmail = await findByEmail(user.email);

		// Check if user exists
		if (userByEmail) {
			return res.status(400).json("Email already exists!");
		}

		const protectedEmails = env.PROTECTED_EMAILS.split(",");

		if (!protectedEmails.includes(user.email)) {
			return res.status(400).json("Invalid admin email");
		}

		const newUser: IUser = {
			name: user.name,
			email: user.email,
			password: user.password,
			role: "admin",
			isOnline: false,
		};

		const userCreated = await createUser(newUser);
		res.status(200).json({
			user: {
				_id: userCreated._id,
				name: userCreated.name,
				email: userCreated.email,
				role: userCreated.role,
				isOnline: userCreated.isOnline,
			},
		});
	} catch (error) {
		return res.status(500).json("Internal server error" + error);
	}
};
