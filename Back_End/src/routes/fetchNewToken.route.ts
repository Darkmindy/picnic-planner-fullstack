import { Router } from "express";
import { fetchingNewToken } from "../controllers/fetchingNewToken.controller";

export const router = Router();

router.get("/token", fetchingNewToken); //? hp of add authMiddleware in this route
