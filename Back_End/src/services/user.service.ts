import jwt, { JwtPayload } from "jsonwebtoken";
import { IDecodedToken } from "../interfaces/decodedToken.interface";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { env } from "../utility/env";

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create(user);
};

export const findByEmail = async (
	email: string | undefined
): Promise<IUser | null> => {
	try {
		if (!email) {
			throw new Error("Email is undefined");
		}
		return await User.findOne({ email: email });
	} catch (err) {
		console.error("Error finding user by email:", err);
		return null;
	}
};

export const updateUserStatusHandler = async (
	id: String,
	status: Boolean
): Promise<IUser | null> => {
	return await User.findOneAndUpdate(
		{ _id: id },
		{ $set: { isOnline: status } },
		{ new: true }
	);
};

// class that is responsible for decoded token verification and retrieval
export class authorizationHandler {
	private decodedToken?: IDecodedToken;
	async verifyToken(token: string): Promise<IDecodedToken | null> {
		try {
			const decoded = jwt.verify(
				token,
				env.ACCESS_SECRET_TOKEN
			) as JwtPayload;
			this.decodedToken = {
				id: decoded.id,
			};
			return this.decodedToken;
		} catch (error) {
			console.error("Error verifying token:", error);
			return null;
		}
	}

	// method that returns the decoded token
	getDecodedToken(): IDecodedToken | undefined {
		return this.decodedToken;
	}
}
