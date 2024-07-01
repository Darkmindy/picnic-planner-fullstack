import { addFriendUser, findByEmail, isFriendAlreadyAdded } from "../services/user.service";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import { Response } from "express";
import { ZOptionalUser, ZUserSchema } from "../validation/user.validation";
import { fromZodError } from "zod-validation-error";

export const addFriend = async (req: ExtendedRequest, res: Response) => {
    try {
        // Validate request
        const validationResult = ZOptionalUser.safeParse(req.body as {email: string});
        if (!validationResult.success) {
            return res.status(400).json(fromZodError(validationResult.error).message);
        }
        
        const friendEmail = validationResult.data.email;
        
        // Check if user (the new friend) exists
        const findUser = await findByEmail(friendEmail);
        if (!findUser) {
            return res.status(404).json("User not found");
        }
        
        // Check if user (the logged in user) exists
        const userId = req.user?._id;
        if (!userId) {
            return res.status(400).json("User not found in the database");
        }

        const newFriendId = findUser._id?.toString();
        
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
