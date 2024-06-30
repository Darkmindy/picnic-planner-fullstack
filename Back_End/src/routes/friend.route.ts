import { Router } from "express";
import { authMiddleware } from "../middleware/authorization.middleware";
import { addFriend } from "../controllers/friends.controller";

export const router = Router();

router.post("/add-friend", authMiddleware, addFriend)
