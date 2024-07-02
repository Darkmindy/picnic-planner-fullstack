export interface IEvent {
    author: string;
    guest: string;
    date: string;
    description: string;
}

export interface EventData {
    _id?: string;
    title: string;
    description: string;
    location: string;
    date: string;
  }