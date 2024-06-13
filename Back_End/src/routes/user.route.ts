import { Router } from "express";
import { logIn } from "../controlllers/login.controller";
import { logOut } from "../controlllers/logout.controller";
import { signUp } from "../controlllers/signup.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", authMiddleware, logOut);
