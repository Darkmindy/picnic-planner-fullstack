import { EventModel } from "../models/event.model";
import { IEvent } from "../validation/event.valitation";

export const getEventByTitle = async (title: string) : Promise<IEvent | null> => {
    return await EventModel.findOne({ title });
}

export const createEvent  = async (event: IEvent) : Promise<IEvent | null> => {
    return await EventModel.create(event);
}