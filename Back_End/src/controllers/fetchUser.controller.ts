import { ExtendedRequest } from "../middleware/authorization.middleware";
import { Response } from "express";
import { findUserById } from "../services/user.service";

export const fetchUser = async (req: ExtendedRequest, res: Response) => {
    try {
        const user = await findUserById(req.user?._id!);
        if (!user) {
            return res.status(404).json("User not found");
        }
        console.log(user.name);
        return res.status(200).json(user.name);
    } catch (error) {
        res.status(500).json("Internal server error" + error);
    }
}