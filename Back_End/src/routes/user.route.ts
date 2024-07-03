import { Router } from "express";
import {
	adminSignUp,
	fetchUser,
	logIn,
	logOut,
	signUp,
} from "../controllers/users.controller";
import { authMiddleware } from "../middleware/authorization.middleware";
import { checkRoleMiddleware } from "../middleware/checkRole.middleware";

export const router = Router();

router.post("/signup", signUp);
router.post("/admin-signup", adminSignUp);
router.post("/login", logIn, checkRoleMiddleware(["user", "admin"]));
router.get(
	"/logout",
	authMiddleware,
	checkRoleMiddleware(["user", "admin"]),
	logOut
);
router.get("/fetch-user", authMiddleware, fetchUser);
