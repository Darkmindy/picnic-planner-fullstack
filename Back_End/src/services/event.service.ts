import { EventModel } from "../models/event.model";
import { User } from "../models/user.model";
import { IEvent } from "../validation/event.valitation";

export const getEventByTitle = async (title: string) : Promise<IEvent | null> => {
    return await EventModel.findOne({ title });
}

export const createEvent  = async (event: IEvent) : Promise<IEvent | null> => {
    return await EventModel.create(event);
}

/* export const createUserEvent  = async (event: IEvent) : Promise<IEvent | null> => {
    return await User.events.create(event);
} */