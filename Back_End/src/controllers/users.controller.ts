import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { fromZodError } from "zod-validation-error";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import {
	createOrUpdateRefreshToken,
	findRefreshToken,
	removeItemFromUserRefreshTokens,
} from "../services/refreshToken.service";
import {
	createUser,
	findByEmail,
	findUserById,
	updateUserStatusHandler,
} from "../services/user.service";
import {
	calculateAccessTokenExpiresAt,
	createTokens,
} from "../utility/commonAuthFunctions";
import { env } from "../utility/env";
import {
	IFormattedRefreshToken,
	IRefreshToken,
} from "../validation/refreshToken.validation";
import {
	IFormattedUser,
	ZLogOutSchema,
	ZUserSchema,
} from "../validation/user.validation";

//* User sign up
export const signUp = async (req: Request, res: Response) => {
	try {
		// Validate request
		const validationUser = ZUserSchema.safeParse(
			req.body as {
				name: string;
				email: string;
				password: string;
			}
		);

		if (!validationUser.success) {
			return res
				.status(400)
				.json(fromZodError(validationUser.error).message);
		}

		const user = validationUser.data as {
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
		const newUser: IFormattedUser = {
			name: user.name,
			email: user.email,
			password: user.password,
			role: "user",
			isOnline: false,
		};

		const userCreated = await createUser(newUser);
		res.status(200).json({
			name: userCreated.name,
			email: userCreated.email,
			role: userCreated.role,
			isOnline: userCreated.isOnline,
		});
	} catch (error) {
		return res.status(500).json("Internal server error" + error);
	}
};

//* Admin sign up
export const adminSignUp = async (req: Request, res: Response) => {
	try {
		const validationUser = ZUserSchema.safeParse(
			req.body as {
				name: string;
				email: string;
				password: string;
			}
		);

		if (!validationUser.success) {
			return res
				.status(400)
				.json(fromZodError(validationUser.error).message);
		}

		const user = validationUser.data as {
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

		const newUser: IFormattedUser = {
			name: user.name,
			email: user.email,
			password: user.password,
			role: "admin",
			isOnline: false,
		};

		const userCreated = await createUser(newUser);
		res.status(200).json({
			user: {
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

//* Login
export const logIn = async (req: Request, res: Response) => {
	try {
		// validate request
		const validationUser = ZUserSchema.safeParse(
			req.body as {
				email: string;
				password: string;
			}
		);

		if (!validationUser.success) {
			return res
				.status(400)
				.json(fromZodError(validationUser.error).message);
		}

		// Get user by email and password
		const user = validationUser.data as {
			email: string;
			password: string;
		};

		const userByEmail = await findByEmail(validationUser.data.email);

		// Check if user exists
		if (!userByEmail) {
			return res
				.status(404)
				.json(
					"Invalid email or password, might be that you're not registered yet"
				);
		}

		// compare password
		const validPassword = await bcrypt.compare(
			user.password,
			userByEmail.password.toString()
		);

		// Check if password matches and exist in db
		if (!validPassword) {
			return res
				.status(404)
				.json(
					"Invalid email or password, might be that you're not registered yet"
				);
		}

		const id = userByEmail!._id?.toString();

		// Check and Update user's online status + access token
		if (userByEmail.isOnline === false && id) {
			const newTokens = createTokens(id);

			// formatting refresh token for client side
			const formattedRefreshToken: IFormattedRefreshToken = {
				token: newTokens.refreshToken,
			};

			// calculate exact expiration time for access token
			const accessTokenExp = calculateAccessTokenExpiresAt();

			await updateUserStatusHandler(id, true);

			const createdRefreshToken: IRefreshToken | null =
				await createOrUpdateRefreshToken(
					id,
					formattedRefreshToken.token
				);

			//! to implement: query the refresh token
			// const refreshToken = await findRefreshToken(
			// 	createdRefreshToken?.token as string
			// )

			//! to implement: access the isExpired property
			// const isExpired = refreshToken?.isExpired
			// if (!isExpired) {
			// }
			return res
				.status(200)
				.header("Authorization", `Bearer ${newTokens.accessToken}`)
				.json({
					message: `User logged in successfully!`,
					accessTokenExp: accessTokenExp,
					refreshToken: createdRefreshToken?.token, // send refresh token
				});
		} else if (userByEmail.isOnline === true && id) {
			return res.status(400).json("User already logged in");
		} else {
			return res
				.status(500)
				.json("Internal server error, please try again later");
		}
	} catch (error) {
		res.status(500).json("Internal server error" + error);
	}
};

//* Log out
export const logOut = async (req: ExtendedRequest, res: Response) => {
	try {
		const validationUserId = ZLogOutSchema.safeParse(req.params);
		if (!validationUserId.success) {
			return res
				.status(400)
				.json(fromZodError(validationUserId.error).message);
		}
		// get user id
		const userId = req.user?._id || validationUserId?.data?.id;
		if (!userId) {
			return res.status(400).json("Missing user id");
		}

		const loggedIn = await findUserById(userId);

		// check if user is already offline
		if (loggedIn?.isOnline === false) {
			return res.status(400).json("User already logged out");
		}

		await updateUserStatusHandler(userId, false);
		await removeItemFromUserRefreshTokens(userId);

		return res.status(200).json("User successfully logged out");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
//? possible implementation: https://g.co/gemini/share/e8055bb5e6af

//* Fetch user
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
