import { Router } from "express";
import { addFriend, removeFriend } from "../controllers/friends.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/add-friend", authMiddleware, addFriend);
router.get("/remove-friend/:id", authMiddleware, removeFriend);
