import { ExtendedRequest } from "../middleware/authorization.middleware";
import { Response } from "express";
import { ZEventSchema } from "../validation/event.valitation";
import { fromZodError } from "zod-validation-error";
import { createEvent, getEventByTitle } from "../services/event.service";
import { findUserById } from "../services/user.service";

/* 
- validate request
- import event from req.body
- the event already exists-
- create event
 */
export const addEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationError = ZEventSchema.safeParse(req.body);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}

		// control if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);

		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}

		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}

		const event = validationError.data;

		const existingEvent = await getEventByTitle(event.title);

		// check if event already exists
		if (existingEvent) {
			return res
				.status(400)
				.json(`Event with title ${event.title} already exists`);
		}

		const createdEvent = await createEvent(event);
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
