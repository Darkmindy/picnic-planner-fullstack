import { EventModel } from "../models/event.model";
import { User } from "../models/user.model";
import { IEvent, IOptionalEvent } from "../validation/event.valitation";
import { IOptionalUser, IUser } from "../validation/user.validation";
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

export const updateUserEvent = async (
	user: IUser,
	eventId: string,
	eventUpdated: IEvent
): Promise<IUser | null> => {
	const result = await User.updateOne(
		{ _id: user._id, "events._id": eventId },
		{ $set: { "events.$": eventUpdated } }
	);

	if(!result){
		return null;
	}
	return await User.findById(user._id);
};
