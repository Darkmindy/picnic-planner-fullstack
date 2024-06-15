import { Router } from "express";
import { logIn } from "../controllers/login.controller";
import { logOut } from "../controllers/logout.controller";
import { adminSignUp, signUp } from "../controllers/signup.controller";
import { authMiddleware } from "../middleware/authorization.middleware";
import { checkRoleMiddleware } from "../middleware/checkRole.middleware";

export const router = Router();

router.post("/signup", signUp);
router.post("/admin-signup", adminSignUp);
router.post("/login", checkRoleMiddleware(["user", "admin"]), logIn);
router.get(
	"/logout",
	authMiddleware,
	checkRoleMiddleware(["user", "admin"]),
	logOut
);
