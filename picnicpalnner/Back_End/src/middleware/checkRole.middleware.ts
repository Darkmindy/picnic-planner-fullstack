import { NextFunction, Response } from "express";
import { findByEmail, findUserById } from "../services/user.service";
import { ExtendedRequest } from "./authorization.middleware";

export const checkRoleMiddleware =
	(allowedRoles: string[]) =>
	async (req: ExtendedRequest, res: Response, next: NextFunction) => {
		const userId = req.user?._id as string;
		const userEmail = req.body as { email: string };
		try {
			const user =
				(await findUserById(userId)) ||
				(await findByEmail(userEmail.email));
			if (!user) {
				return res.status(401).json("Unauthorized: User not found");
			}

			if (!allowedRoles.includes(user.role)) {
				return res
					.status(403)
					.json("Forbidden: Insufficient permissions");
			}

			// User is authorized, proceed with the request
			next();
		} catch (error) {
			return res.status(500).json("Internal Server Error" + error);
		}
	};
