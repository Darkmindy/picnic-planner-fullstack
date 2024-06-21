import { NextFunction, Request, Response } from "express";
import { authorizationHandler } from "../services/user.service";

// create an instance of the authorizationHandler() class, in order to use it
export const authHandler = new authorizationHandler();

// Interface for request with decoded user information
export interface ExtendedRequest extends Request {
	user?: { _id: string };
}

export const authMiddleware = async (
	req: ExtendedRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(401).json("Unauthorized: Token not provided");
	}

	try {
		const decoded = await authHandler.verifyToken(token);
		if (!decoded) {
			return res
				.status(401)
				.json(
					"Unauthorized: Invalid token or expired, please use refresh token to get a new one"
				);
		}

		if (decoded) {
			req.user = { _id: decoded.id } as ExtendedRequest["user"];
		}

		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json("Internal Server Error" + error);
	}
};
