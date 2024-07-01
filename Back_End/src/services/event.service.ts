import { EventModel } from "../models/event.model";
import { IEvent, IOptionalEvent } from "../validation/event.valitation";

export const getEventByTitle = async (
	title: string
): Promise<IEvent | null> => {
	return await EventModel.findOne({ title });
};

export const createEvent = async (event: IEvent): Promise<IEvent | null> => {
	return await EventModel.create(event);
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
	return await EventModel.findById(id);
};

export const updateEvent = async (
	eventId: string,
	event: IOptionalEvent
): Promise<IEvent | null> => {
	return await EventModel.findOneAndUpdate(
		{ _id: eventId },
		{ $set: event },
		{ new: true }
	);
};
