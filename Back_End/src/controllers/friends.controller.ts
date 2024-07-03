import { Response } from "express";
import mongoose from "mongoose";
import { fromZodError } from "zod-validation-error";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import {
	addFriendUser,
	//getFriendById,
	isFriendAlreadyAdded,
	removeUserFriend,
} from "../services/friend.service";
import { findByEmail, findUserById } from "../services/user.service";
import { ZOptionalUser } from "../validation/user.validation";

export const addFriend = async (req: ExtendedRequest, res: Response) => {
	try {
		// Validate request
		const validationResult = ZOptionalUser.safeParse(
			req.body as { email: string }
		);
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
		}

		const friendEmail = validationResult.data.email;

		// Check if user (the logged in user) exists
		const userId = req.user?._id;
		if (!userId) {
			return res.status(400).json("User not found in the database");
		}

		// Check if friend email is not the same as the logged in user
		const findUserByEmail = await findUserById(userId);

		if (findUserByEmail?.email === friendEmail) {
			return res.status(400).json("You can't add yourself as a friend");
		}

		// Check if user (the new friend) exists
		const findFriendByEmail = await findByEmail(friendEmail);

		if (!findFriendByEmail) {
			return res
				.status(404)
				.json(
					"User not found, you can't add a friend that doesn't exist"
				);
		}

		const newFriendId = findFriendByEmail._id?.toString();

		// Check if the user (the logged in user) is already friends with the new friend
		const alreadyFriends = await isFriendAlreadyAdded(userId, newFriendId!);
		if (alreadyFriends) {
			return res.status(400).json("User is already a friend");
		}

		// Add the new friend to the user (the logged in user)
		await addFriendUser(userId, newFriendId!);

		res.status(200).json("Friend added successfully");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

export const removeFriend = async (req: ExtendedRequest, res: Response) => {
	try {
		// find the id of the friend to delete
		const friendId = req.params.id;

		if (typeof friendId !== "string") {
			return res.status(400).json(`Friend ID must be a string`);
		}
		// validate request
		const validationResult = ZOptionalUser.safeParse({ friendId });
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
		}

		// check if friendId is valid
		const validFriendId = mongoose.Types.ObjectId.isValid(friendId);
		if (!validFriendId) {
			return res
				.status(400)
				.json(`Invalid friend id, please provide a valid id`);
		}

		//? decide if i need to check if friendId exists in the db, or using the isFriendAlreadyAdded function to check if the 2 users are not friends
		// const existingFriend = await getFriendById(friendId);
		// if (!existingFriend) {
		// 	return res.status(400).json(`Friend with id ${friendId} not found`);
		// }

		// check if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}

		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}

		// check if user and friend is not friends
		const isAlreadyFriends = await isFriendAlreadyAdded(userId, friendId);
		if (!isAlreadyFriends) {
			return res.status(400).json(`The 2 users are not friends`);
		}

		// remove friend
		await removeUserFriend(userId, friendId);
		res.status(200).json("Friend removed successfully");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
