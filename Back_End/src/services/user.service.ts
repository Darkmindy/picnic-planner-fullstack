import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { env } from "../utility/env";
import { IDecodedToken } from "../validation/decodedToken.validation";
import { IEvent } from "../validation/event.valitation";
import { IUser } from "../validation/user.validation";

export const createUser = async (user: IUser): Promise<IUser> => {
	return await User.create(user);
};

export const findUserById = async (id: string): Promise<IUser | null> => {
	return await User.findById(id);
};

export const findByEmail = async (
	email: string | undefined
): Promise<IUser | null> => {
	return await User.findOne({ email: email });
};

export const updateUserStatusHandler = async (
	id: string,
	status: boolean
): Promise<IUser | null> => {
	const user = await User.findOneAndUpdate(
		{ _id: id },
		{ $set: { isOnline: status } },
		{ new: true }
	);
	return user;
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

	async verifyRefreshToken(token: string): Promise<IDecodedToken | null> {
		try {
			const decoded = jwt.verify(
				token,
				env.REFRESH_SECRET_TOKEN
			) as JwtPayload;
			this.decodedToken = {
				id: decoded.id,
			};
			return this.decodedToken;
		} catch (error) {
			console.error("Error verifying refresh token:", error);
			return null;
		}
	}

	// method that returns the decoded token
	getDecodedToken(): IDecodedToken | undefined {
		return this.decodedToken;
	}
}
export const createOrUpdateUserEvents = async (
	userId: string,
	events: IEvent[]
): Promise<IUser | null> => {
	return await User.findByIdAndUpdate(userId, { events }, { new: true });
};


// TODO forse è meglio utilizzare create e non findByIdAndUpdate
export const addFriendUser = async (userId: string, friendId: string) => {
	return await User.findByIdAndUpdate(
		userId,
		{ $push: { friends: friendId } },
		{ new: true }
	);
};

export const isFriendAlreadyAdded = async (
	userId: string,
	friendId: string
): Promise<boolean> =>
	await User.findById(userId, "friends").then((user) =>
		user && user.friends!.includes(friendId) ? true : false
	);
