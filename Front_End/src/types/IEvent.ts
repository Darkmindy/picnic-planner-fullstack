export interface IEvent {
    author: string;
    guest: string;
    date: string;
    description: string;
}

export interface Event {
    id: string, 
    title: string, 
    date: string, 
    time: string, 
    location: string, 
    participants: string[], 
    status: "In pianificazione" | "In Corso" | "Completato",
}