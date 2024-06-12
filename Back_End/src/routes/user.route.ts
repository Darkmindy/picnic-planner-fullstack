import { Router } from "express";
import { logIn } from "../controlllers/login.controller";
import { signUp } from "../controlllers/signup.controller";

export const router = Router();

router.post("/signup", signUp);
router.post("/login", logIn);
// add a logOut logic here
