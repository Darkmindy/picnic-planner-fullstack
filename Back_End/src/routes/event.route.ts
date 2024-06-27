import { Router } from "express";
import { addEvent } from "../controllers/createEvent.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/add-event", authMiddleware, addEvent)
//router.put("/update-event", updateEvent)