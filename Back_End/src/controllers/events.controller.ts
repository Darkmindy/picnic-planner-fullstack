import { ExtendedRequest } from "../middleware/authorization.middleware";
import { Response } from "express";
import { ZEventSchema } from "../validation/event.valitation";
import { fromZodError } from "zod-validation-error";
import {
	createEvent,
	getEventById,
	getEventByTitle,
	showEvents,
	//updateSpecificUserEvent,
} from "../services/event.service";
import {
	createUserEvents,
	findUserById,
	updateUserEvents,
} from "../services/user.service";

/* 
- validate request
- import event from req.body
- the event already exists-
- create event
*/
export const addEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationResult = ZEventSchema.safeParse(req.body);
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
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

		const event = validationResult.data;

		const existingEvent = await getEventByTitle(event.title);

		// check if event already exists
		if (existingEvent) {
			return res
				.status(400)
				.json(`Event with title ${event.title} already exists`);
		}
		const createdEvent = await createEvent(event);
		if (createdEvent) {
			existingUser.events!.push(createdEvent);
			if (existingUser._id && existingUser.events) {
				const userId = existingUser._id.toString();
				await createUserEvents(userId, existingUser.events);
			}
		}
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

// TODO da rivedere!!!
/* export const updateEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationResult = ZEventSchema.safeParse(req.body);
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
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

		// find the id of the event to update

		const eventId = req.params.id;
		console.log("eventId: " + eventId);

		// check if event exists
		const existingEvent = await getEventById(eventId);
		if (!existingEvent) {
			return res.status(400).json(`Event with id ${eventId} not found`);
		}

		const updatedUserEvent = await updateSpecificUserEvent(userId, eventId, validationResult.data);
		if(!updatedUserEvent) {
			return res.status(400).json(`Event with id ${eventId} not found in user's events`);
		}
		res.status(200).json(updatedUserEvent);
		//TODO c'è un bug perchè l'evento si modifica all'interno dell'utente ma non nella sezione events dell'utente
		//existingUser.events!.push(event);
		 if (existingUser._id && existingUser.events) {
			const userId = existingUser._id.toString();
			await createUserEvents(userId, existingUser.events);
		}
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
}; */

export const getEvents = async (req: ExtendedRequest, res: Response) => {
	try {
		const allEvents = await showEvents();
		res.status(200).json(allEvents);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
