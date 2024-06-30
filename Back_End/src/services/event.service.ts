import { EventModel } from "../models/event.model";
import { User } from "../models/user.model";
import { IEvent } from "../validation/event.valitation";

export const getEventByTitle = async (title: string) : Promise<IEvent | null> => {
    return await EventModel.findOne({ title });
}

export const createEvent  = async (event: IEvent) : Promise<IEvent | null> => {
    return await EventModel.create(event);
}

export const getEventById = async (id: string) : Promise<IEvent | null> => {
    return await EventModel.findById(id);
}

export const showEvents = async () : Promise<IEvent[]> => {
    return await EventModel.find();
}

/* export const updateSpecificUserEvent = async (userId: string, eventId: string, updatedEvent: IEvent) : Promise<IEvent | null> => {
    // Trova l'utente nel database
    const user = await User.findById(userId);

    if (!user) {
        return null;
    }

    // Trova l'evento specifico nell'array 'events'
    const eventIndex = user!.events!.findIndex(event => event._id!.toString() === eventId);

    if (eventIndex === -1) {
        return null;
    }

    // Aggiorna l'evento specifico
    user.events[eventIndex] = { ...user.events[eventIndex].toObject(), ...updatedEvent };

    // Salva le modifiche nel database
    await user.save();

    return user.events[eventIndex];
}; */
