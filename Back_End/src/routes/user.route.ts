import { Router } from "express";
import { logIn } from "../controllers/login.controller";
import { logOut } from "../controllers/logout.controller";
import { signUp } from "../controllers/signup.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", authMiddleware, logOut);
