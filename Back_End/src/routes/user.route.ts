import { Router } from "express";
import { logIn } from "../controllers/login.controller";
import { logOut } from "../controllers/logout.controller";
import { adminSignUp, signUp } from "../controllers/signup.controller";
import { authMiddleware } from "../middleware/authorization.middleware";
import { checkRoleMiddleware } from "../middleware/checkRole.middleware";
import { fetchUser } from "../controllers/fetchUser.controller";
import { fetchingNewToken } from "../controllers/fetchingNewToken.controller";

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
router.get("/fetch-user", authMiddleware, fetchUser);
router.post("/token", fetchingNewToken);
