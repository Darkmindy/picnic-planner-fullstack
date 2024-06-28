import React, { FC, useState } from 'react';
import { IEvent } from '../../types/IEvent';
import { formatDate } from '../../types/formatDate'; // Assicura di importare formatDate correttamente
import './EventCalendar.css';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = ({ events }) => { // Destructuring di props direttamente nell'argomento della funzione
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event Name:', eventName);
    console.log('Event Date:', eventDate);
    // Aggiungi qui la logica per inviare i dati del nuovo evento al backend, se necessario
  };

  // Funzione per renderizzare le celle del calendario con gli eventi presenti in quella data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderEvents = (value: Date) => {
    const formattedDate = formatDate(value); // Utilizza formatDate per formattare la data
    const currentDayEvents = events.filter(ev => ev.date === formattedDate);
    return (
      <div>
        {currentDayEvents.map((ev, index) =>
          <div key={index}>{ev.description}</div>
        )}
      </div>
    );
  };

  return (
    <div className="event-calendar">
      <form onSubmit={handleSubmit} className="event-form">
        <h2>Crea un nuovo evento</h2>
        <div>
          <label>Nome dell'evento:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div>
          <label>Data dell'evento:</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <button type="submit">Crea evento</button>
      </form>

      <div className="calendar">
        <h2>Calendario Eventi</h2>
        {/* Qui puoi chiamare renderEvents o implementare il calendario come desideri */}
      </div>
    </div>
  );
};

export default EventCalendar;
