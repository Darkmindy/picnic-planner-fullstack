import { User } from "../models/user.model";
import { IUser } from "../validation/user.validation";

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

//? decide if i need to check if friendId exists in the db, or using the isFriendAlreadyAdded function to check if the 2 users are not friends
// export const getFriendById = async (
// 	friendId: string
// ): Promise<IUser | null> => {
// 	return await User.findOne({ friends: friendId });
// };

export const removeUserFriend = async (userId: string, friendId: string) => {
	return await User.findByIdAndUpdate(
		userId,
		{ $pull: { friends: friendId } },
		{ new: true }
	);
};
